package com.example.tinygarden.service;

import com.example.tinygarden.dto.OrderDto;
import com.example.tinygarden.entity.Order;

import java.util.List;
import java.util.Optional;

public interface OrderService {
    String save(OrderDto orderDto);
    List<Order> getAll();
    Optional<Order> getById(Integer orderId);
    String deleteById(Integer orderId);
    String deleteByPlant_PlantId(Integer plantId);
}
