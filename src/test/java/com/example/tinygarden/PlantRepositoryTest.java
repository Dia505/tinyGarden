package com.example.tinygarden;

import com.example.tinygarden.entity.Customer;
import com.example.tinygarden.entity.Plant;
import com.example.tinygarden.repository.PlantRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;
import org.assertj.core.api.Assertions;

import java.util.List;
import java.util.Optional;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class PlantRepositoryTest {
    @Autowired
    private PlantRepository plantRepository;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void save() {
        Plant plant = new Plant();

        plant.setPlantName("Test plant name");
        plant.setType("Test plant type");
        plant.setSciName("Test scientific name");
        plant.setImage("Test image");
        plant.setPrice(500.00);
        plant.setLightReq("low");
        plant.setWaterReq("low");
        plant.setPetFriendly("no");
        plant.setAddFeature("Test additional feature");

        plant = plantRepository.save(plant);

        Assertions.assertThat(plant.getPlantId()).isGreaterThan(0);
    }

    @Test
    @Order(2)
    public void findByType() {
        List<Plant> plantList = plantRepository.findByType("Test plant type");
        Assertions.assertThat(plantList.size()).isGreaterThan(0);
    }

    @Test
    @Order(3)
    public void findAll() {
        List<Plant> plantList = plantRepository.findAll();
        Assertions.assertThat(plantList.size()).isGreaterThan(0);
    }

    @Test
    @Order(4)
    public void findById() {
        Plant plant = plantRepository.findById(1).get();
        Assertions.assertThat(plant.getPlantId()).isEqualTo(1);
    }

    @Test
    @Order(5)
    @Rollback(value = false)
    public void updatePlant() {
        Plant plant = plantRepository.findById(1).get();
        plant.setImage("Testing image updated");
        plant.setPrice(1200.00);
        plant = plantRepository.save(plant);

        Assertions.assertThat(plant.getImage()).isEqualTo("Testing image updated");
        Assertions.assertThat(plant.getPrice()).isEqualTo(1200.00);
    }

    @Test
    @Order(6)
    public void deleteById() {
        plantRepository.deleteById(1);

        Plant plant1 = null;
        Optional<Plant> plant = plantRepository.findById(1);

        if(plant.isPresent()) {
            plant1 = plant.get();
        }

        Assertions.assertThat(plant1).isNull();
    }
}
