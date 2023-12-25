package com.example.tinygarden.service.impl;

import com.example.tinygarden.dto.PlantDto;
import com.example.tinygarden.entity.Plant;
import com.example.tinygarden.repository.PlantRepository;
import com.example.tinygarden.service.PlantService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PlantServiceImpl implements PlantService {
    private final PlantRepository plantRepository;

    @Override
    public String save(PlantDto plantDto) {
        Plant plant = new Plant();

        if(plantDto.getPlantId() != null) {
            plant = plantRepository.findById(plantDto.getPlantId())
                    .orElseThrow(() ->new NullPointerException("error"));
        }

        plant.setPlantName(plantDto.getPlantName());
        plant.setType(plantDto.getType());
        plant.setPrice(plantDto.getPrice());
        plant.setImage(plantDto.getImage());
        plant.setSciName(plantDto.getSciName());
        plant.setLightReq(plantDto.getLightReq());
        plant.setWaterReq(plantDto.getWaterReq());
        plant.setPetFriendly(plantDto.getPetFriendly());
        plant.setAddFeature(plantDto.getAddFeature());

        plantRepository.save(plant);
        return "Data saved";
    }

    @Override
    public List<Plant> getByType(String type) {
        return plantRepository.findByType(type);
    }

    @Override
    public Optional<Plant> getById(Integer plantId) {
        return plantRepository.findById(plantId);
    }

    @Override
    public String deleteById(Integer plantId) {
        plantRepository.deleteById(plantId);
        return "Data deleted";
    }
}
