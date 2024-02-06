package com.example.tinygarden.repository;

import com.example.tinygarden.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    @Query(value = "select * from customer where email=?1", nativeQuery = true)
    Optional<Customer> getUserByEmail(String email);
}
