package com.example.tinygarden.controller;

import com.example.tinygarden.dto.PlantDto;
import com.example.tinygarden.entity.Plant;
import com.example.tinygarden.service.PlantService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/plant")
@RequiredArgsConstructor
public class PlantController {
    private final PlantService plantService;

    @PostMapping("/save-plant-details")
    public String insertData(@ModelAttribute PlantDto plantDto) {
        System.out.println(plantDto);
        plantService.save(plantDto);
        return "Data saved";
    }

    @GetMapping("/get-by-type/{type}")
    public List<Plant> getByType(@PathVariable("type") String type) {
        return plantService.getByType(type);
    }

    @GetMapping("/get-by-id/{plantId}")
    public Optional<Plant> getById(@PathVariable("plantId") Integer plantId) {
//        System.out.println(plantService.getById(plantId));
        return plantService.getById(plantId);
    }

    @DeleteMapping("/delete-by-id/{plantId}")
    public String deleteById(@PathVariable("plantId") Integer plantId) {
        plantService.deleteById(plantId);
        return "Data deleted";
    }
}
