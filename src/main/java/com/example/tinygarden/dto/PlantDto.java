package com.example.tinygarden.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlantDto {
    private Integer plantId;

    @NotNull
    private String plantName;

    @NotNull
    private String type;

    @NotNull
    private Double price;

    private MultipartFile image;

    @NotNull
    private String sciName;

    @NotNull
    private String lightReq;

    @NotNull
    private String waterReq;

    @NotNull
    private String petFriendly;

    @NotNull
    private String addFeature;

}
