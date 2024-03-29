package com.example.tinygarden.repository;

import com.example.tinygarden.entity.Order;
import com.example.tinygarden.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
    List<OrderItem> findAllByOrder(Order order);
}
