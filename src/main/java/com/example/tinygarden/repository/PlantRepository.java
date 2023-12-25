package com.example.tinygarden.repository;

import com.example.tinygarden.entity.Customer;
import com.example.tinygarden.entity.Plant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlantRepository extends JpaRepository<Plant, Integer> {
    List<Plant> findByType(String type);
}
