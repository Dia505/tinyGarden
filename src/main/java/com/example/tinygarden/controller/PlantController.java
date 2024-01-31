package com.example.tinygarden.controller;

import com.example.tinygarden.dto.PlantDto;
import com.example.tinygarden.entity.Customer;
import com.example.tinygarden.entity.Plant;
import com.example.tinygarden.service.PlantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

    @PostMapping("/update-plant")
    public String updatePlant(@ModelAttribute PlantDto plantDto) {
        plantService.updatePlant(plantDto);
        return "Plant image updated";
    }

    @PostMapping("/update-plant-without-image")
    public String updatePlantWithoutImage(@RequestBody PlantDto plantDto) {
        plantService.updatePlantWithoutImage(plantDto);
        return "Plant details updated";
    }

    @GetMapping("/get-all-data")
    public List<Plant> getAllData() {
        return plantService.getAll();
    }

    @GetMapping("/plant-record")
    public ResponseEntity<Object> findAllRecords() {
        List<Plant> plants = plantService.getAll();
        int totalRecords = plants.size();
        Map<String, Object> response = new HashMap<>();
        response.put("totalRecords", totalRecords);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
