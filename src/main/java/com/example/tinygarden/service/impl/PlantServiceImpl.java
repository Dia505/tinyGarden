package com.example.tinygarden.service.impl;

import com.example.tinygarden.dto.PlantDto;
import com.example.tinygarden.entity.Plant;
import com.example.tinygarden.repository.PlantRepository;
import com.example.tinygarden.service.PlantService;
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
    @Autowired
    private final PlantRepository plantRepository;

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
    public String deleteById(Integer plantId) {
        plantRepository.deleteById(plantId);
        return "Data deleted";
    }
}
