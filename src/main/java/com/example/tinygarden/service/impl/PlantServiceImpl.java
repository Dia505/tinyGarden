package com.example.tinygarden.service.impl;

import com.example.tinygarden.dto.PlantDto;
import com.example.tinygarden.entity.Plant;
import com.example.tinygarden.repository.OrderRepository;
import com.example.tinygarden.repository.PlantRepository;
import com.example.tinygarden.service.PlantService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PlantServiceImpl implements PlantService {
    private final PlantRepository plantRepository;
    private final OrderRepository orderRepository;

    @Value("${upload.path}")
    private String uploadPath;
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
        plant.setSciName(plantDto.getSciName());
        plant.setLightReq(plantDto.getLightReq());
        plant.setWaterReq(plantDto.getWaterReq());
        plant.setPetFriendly(plantDto.getPetFriendly());
        plant.setAddFeature(plantDto.getAddFeature());

        String fileName = UUID.randomUUID().toString()+"_"+plantDto.getImage().getOriginalFilename();
        Path filePath = Paths.get(uploadPath, fileName);

        String trimmedPath = StringUtils.trimAllWhitespace(filePath.toString());

        try {
            System.out.println("Source Path: " + plantDto.getImage().getOriginalFilename());
            System.out.println("Destination Path: " + filePath);

            Files.copy(plantDto.getImage().getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        }
        catch(IOException e) {
            throw new RuntimeException(e);
        }
        plant.setImage(fileName);
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
    @Transactional
    public String deleteById(Integer plantId) {
        orderRepository.deleteOrderByPlant(plantId);
        plantRepository.deleteById(plantId);
        return "Data deleted";
    }

    @Override
    public String updatePlant(PlantDto plantDto) {
        Plant existingPlant = plantRepository.findById(plantDto.getPlantId())
                .orElseThrow(() -> new EntityNotFoundException("Plant not found"));
        existingPlant.setPlantName(plantDto.getPlantName());
        existingPlant.setType(plantDto.getType());
        existingPlant.setPrice(plantDto.getPrice());
        existingPlant.setSciName(plantDto.getSciName());
        existingPlant.setLightReq(plantDto.getLightReq());
        existingPlant.setWaterReq(plantDto.getWaterReq());
        existingPlant.setPetFriendly(plantDto.getPetFriendly());
        existingPlant.setAddFeature(plantDto.getAddFeature());

        String fileName = UUID.randomUUID().toString()+"_"+plantDto.getImage().getOriginalFilename();
        Path filePath = Paths.get(uploadPath, fileName);

        try {
            Files.copy(plantDto.getImage().getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        }
        catch (IOException e) {
            throw new RuntimeException(e);
        }

        existingPlant.setImage(fileName);
        plantRepository.save(existingPlant);
        return "Plant image updated";
    }

    @Override
    public String updatePlantWithoutImage(PlantDto plantDto) {
        Plant existingPlant = plantRepository.findById(plantDto.getPlantId())
                .orElseThrow(() -> new EntityNotFoundException("Plant not found"));
        existingPlant.setPlantName(plantDto.getPlantName());
        existingPlant.setType(plantDto.getType());
        existingPlant.setPrice(plantDto.getPrice());
        existingPlant.setSciName(plantDto.getSciName());
        existingPlant.setLightReq(plantDto.getLightReq());
        existingPlant.setWaterReq(plantDto.getWaterReq());
        existingPlant.setPetFriendly(plantDto.getPetFriendly());
        existingPlant.setAddFeature(plantDto.getAddFeature());

        plantRepository.save(existingPlant);

        return "Plant details updated";
    }

    @Override
    public List<Plant> getAll() {
        return plantRepository.findAll();
    }
}
