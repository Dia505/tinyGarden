package com.example.tinygarden.repository;

import com.example.tinygarden.entity.Customer;
import com.example.tinygarden.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Integer> {
}
