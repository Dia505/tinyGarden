package com.example.tinygarden;

import com.example.tinygarden.entity.Customer;
import com.example.tinygarden.entity.OrderItem;
import com.example.tinygarden.entity.Plant;
import com.example.tinygarden.repository.CustomerRepository;
import com.example.tinygarden.repository.OrderItemRepository;
import com.example.tinygarden.repository.OrderRepository;
import com.example.tinygarden.repository.PlantRepository;
import org.h2.table.Plan;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.assertj.core.api.Assertions;
import org.springframework.test.annotation.Rollback;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class OrderRepositoryTest {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private PlantRepository plantRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void save() throws ParseException {
        com.example.tinygarden.entity.Order order = new com.example.tinygarden.entity.Order();

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = dateFormat.parse("2024-02-07");
        order.setDate(date);
        order.setTotalPrice(1200.00);

        Customer customer = new Customer();

        customer.setCustomerId(1);
        customer.setFullName("Test name");
        customer.setAddress("Test address");
        customer.setMobileNo("123");
        customer.setEmail("Test email");
        customer.setPassword("Test password");

        customer = customerRepository.save(customer);
        order.setCustomer(customer);

        order = orderRepository.save(order);

        OrderItem orderItem = new OrderItem();

        Plant plant = new Plant();

        plant.setPlantName("Test plant name");
        plant.setType("Test plant type");
        plant.setSciName("Test scientific name");
        plant.setImage("Test image");
        plant.setPrice(500.00);
        plant.setLightReq("low");
        plant.setWaterReq("low");
        plant.setPetFriendly("no");
        plant.setAddFeature("Test additional feature");

        plant = plantRepository.save(plant);
        orderItem.setPlant(plant);
        orderItem.setQuantity(2);
        orderItem.setOrder(order);

        orderItemRepository.save(orderItem);

        Assertions.assertThat(order.getOrderId()).isGreaterThan(0);
    }

    @Test
    @Order(2)
    public void findAll() {
        List<com.example.tinygarden.entity.Order> orderList = orderRepository.findAll();
        Assertions.assertThat(orderList.size()).isGreaterThan(0);
    }

    @Test
    @Order(3)
    public void findById() {
        com.example.tinygarden.entity.Order order = orderRepository.findById(1).get();
        Assertions.assertThat(order.getOrderId()).isEqualTo(1);
    }

    @Test
    @Order(4)
    public void findAllByCustomerCustomerId() {
        List<com.example.tinygarden.entity.Order> orderList = orderRepository.findAllByCustomerCustomerId(1);
        Assertions.assertThat(orderList.size()).isGreaterThan(0);
    }

    @Test
    @Order(5)
    public void deleteById() {
        orderRepository.deleteById(1);

        com.example.tinygarden.entity.Order order1 = null;
        Optional<com.example.tinygarden.entity.Order> order = orderRepository.findById(1);

        if(order.isPresent()) {
            order1 = order.get();
        }

        Assertions.assertThat(order1).isNull();
    }
}
