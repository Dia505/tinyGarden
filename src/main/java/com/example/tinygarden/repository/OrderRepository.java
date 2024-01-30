package com.example.tinygarden.repository;

import com.example.tinygarden.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    @Modifying
    @Query(value = "delete from orders where plant_id=?1",nativeQuery = true)
    void deleteOrderByPlant(Integer plantId);
}
