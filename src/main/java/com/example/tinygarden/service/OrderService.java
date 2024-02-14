package com.example.tinygarden.service;

import com.example.tinygarden.dto.OrderDto;
import com.example.tinygarden.entity.Order;

import java.util.List;

public interface OrderService {
    String save(OrderDto orderDto);
    OrderDto convertToDto(Order order);
    List<OrderDto> getAll();
    List<OrderDto> getById(Integer orderId);
    List<OrderDto> getByCustomerId(Integer customerId);
    String deleteById(Integer orderId);
}
