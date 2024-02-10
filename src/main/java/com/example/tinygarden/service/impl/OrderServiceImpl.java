package com.example.tinygarden.service.impl;

import com.example.tinygarden.dto.OrderDto;
import com.example.tinygarden.entity.Customer;
import com.example.tinygarden.entity.Order;
import com.example.tinygarden.entity.Plant;
import com.example.tinygarden.repository.CustomerRepository;
import com.example.tinygarden.repository.OrderRepository;
import com.example.tinygarden.repository.PlantRepository;
import com.example.tinygarden.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final PlantRepository plantRepository;

    @Override
    public String save(OrderDto orderDto) {
        Order order = new Order();

        Customer customer = customerRepository.findById(orderDto.getCustomerId())
                .orElseThrow(()->new NoSuchElementException("No data found"));
        order.setCustomer(customer);

        order.setDate(orderDto.getDate());

        Plant plant = plantRepository.findById(orderDto.getPlantId())
                .orElseThrow(()->new NoSuchElementException("No data found"));
        order.setPlant(plant);
        order.setQuantity(orderDto.getQuantity());

        Double totalPrice = orderDto.getQuantity() * plant.getPrice();
        order.setTotalPrice(totalPrice);

        orderRepository.save(order);

        return "Order saved";
    }

    @Override
    public List<Order> getAll() {
        return orderRepository.findAll();
    }

    @Override
    public Optional<Order> getById(Integer orderId) {
        return orderRepository.findById(orderId);
    }

    @Override
    public String deleteById(Integer orderId) {
        orderRepository.deleteById(orderId);
        return "Order deleted";
    }

}
