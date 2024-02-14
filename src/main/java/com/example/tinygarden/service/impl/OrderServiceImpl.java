package com.example.tinygarden.service.impl;

import com.example.tinygarden.dto.OrderDto;
import com.example.tinygarden.dto.OrderItemDto;
import com.example.tinygarden.entity.Customer;
import com.example.tinygarden.entity.Order;
import com.example.tinygarden.entity.OrderItem;
import com.example.tinygarden.entity.Plant;
import com.example.tinygarden.repository.CustomerRepository;
import com.example.tinygarden.repository.OrderItemRepository;
import com.example.tinygarden.repository.OrderRepository;
import com.example.tinygarden.repository.PlantRepository;
import com.example.tinygarden.service.OrderService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final PlantRepository plantRepository;
    private final OrderItemRepository orderItemRepository;

    @Override
    @Transactional
    public String save(OrderDto orderDto) {
        Order order = new Order();

        Customer customer = customerRepository.findById(orderDto.getCustomerId())
                .orElseThrow(()->new NoSuchElementException("No data found"));
        order.setCustomer(customer);

        LocalDate today = LocalDate.now();
        Date date = java.sql.Date.valueOf(today);
        order.setDate(date);

        double totalPrice = 0.0;
        List<OrderItemDto> orderItemDtos1 = orderDto.getOrderItems();
        if (orderItemDtos1 != null) {
            for (OrderItemDto orderItemDto : orderItemDtos1) {
                Optional<Plant> optionalPlant = plantRepository.findById(orderItemDto.getPlantId());
                if (optionalPlant.isPresent()) {
                    Plant plant = optionalPlant.get();
                    int quantity = orderItemDto.getQuantity() != null && orderItemDto.getQuantity() > 0 ? orderItemDto.getQuantity() : 0;
                    totalPrice += plant.getPrice() * quantity;
                }
            }
        }

        totalPrice += 100.0;

        order.setTotalPrice(totalPrice);

        orderRepository.save(order);

        List<OrderItemDto> orderItemDtos = orderDto.getOrderItems();
        System.out.println("orderItemDtos: " + orderItemDtos);
        if (orderItemDtos != null) {
            for (OrderItemDto orderItemDto : orderItemDtos) {
                Optional<Plant> optionalPlant = plantRepository.findById(orderItemDto.getPlantId());
                if (optionalPlant.isPresent()) {
                    Plant plant = optionalPlant.get();
                    int quantity = orderItemDto.getQuantity() != null && orderItemDto.getQuantity() > 0 ? orderItemDto.getQuantity() : 0;
                    if (quantity > 0) {
                        OrderItem orderItem = new OrderItem();
                        orderItem.setOrder(order);
                        orderItem.setPlant(plant);
                        orderItem.setQuantity(quantity);
                        orderItemRepository.save(orderItem); // Save order item
                        System.out.println("order items: "+orderItem);
                    }
                }
            }
        }

        return "Order saved";
    }

    @Override
    public OrderDto convertToDto(Order order) {
        OrderDto orderDto = new OrderDto();

        orderDto.setOrderId(order.getOrderId());
        orderDto.setCustomerId(order.getCustomer().getCustomerId());

        orderDto.setDate(order.getDate());

        orderDto.setTotalPrice(order.getTotalPrice());

        List<OrderItem> orderItems = orderItemRepository.findAllByOrder(order);
        List<OrderItemDto> orderItemDtos = new ArrayList<>();

        for(OrderItem orderItem : orderItems) {
            OrderItemDto orderItemDto = new OrderItemDto();
            orderItemDto.setPlantId(orderItem.getPlant().getPlantId());
            orderItemDto.setPlantName(orderItem.getPlant().getPlantName());
            orderItemDto.setQuantity(orderItem.getQuantity());
            orderItemDtos.add(orderItemDto);
        }

        orderDto.setOrderItems(orderItemDtos);

        return orderDto;
    }

    @Override
    public List<OrderDto> getAll() {
        List<Order> allOrders = orderRepository.findAll();
        return allOrders.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public List<OrderDto> getById(Integer orderId) {
        Optional<Order> orderById = orderRepository.findById(orderId);
        return orderById.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public List<OrderDto> getByCustomerId(Integer customerId) {
        List<Order> orderByUser = orderRepository.findAllByCustomerCustomerId(customerId);
        return orderByUser.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public String deleteById(Integer orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();

            List<OrderItem> orderItems = orderItemRepository.findAllByOrder(order);
            orderItemRepository.deleteAll(orderItems);

            orderRepository.deleteById(orderId);
        }
        else {
            throw new NoSuchElementException("Order not found for ID: " + orderId);
        }
        return "Order deleted";
    }

}
