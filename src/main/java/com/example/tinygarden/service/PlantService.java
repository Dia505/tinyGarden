package com.example.tinygarden.service;

import com.example.tinygarden.dto.PlantDto;
import com.example.tinygarden.entity.Plant;

import java.util.List;
import java.util.Optional;

public interface PlantService {
    String save(PlantDto plantDto);
    List<Plant> getByType(String type);
    Optional<Plant> getById(Integer plantId);
    String deleteById(Integer plantId);
    String updatePlant(PlantDto plantDto);
    String updatePlantWithoutImage(PlantDto plantDto);
}
