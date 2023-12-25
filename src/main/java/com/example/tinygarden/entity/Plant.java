package com.example.tinygarden.entity;

import jakarta.persistence.*;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity

@Table(name = "Plant", uniqueConstraints = {
        @UniqueConstraint(name = "UNIQUE_plant_plantName", columnNames = "plantName"),
        @UniqueConstraint(name = "UNIQUE_customer_sciName", columnNames = "sciName")
})

public class Plant {
    @Id
    @SequenceGenerator(name = "plant_seq_gen", sequenceName = "plant_id_seq", allocationSize = 1)
    @GeneratedValue(generator = "plant_seq_gen", strategy = GenerationType.SEQUENCE)
    private Integer plantId;

    @Column(name = "plantName", nullable = false)
    private String plantName;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "image", nullable = false)
    private String image;

    @Column(name = "sciName", nullable = false)
    private String sciName;

    @Column(name = "lightReq", nullable = false)
    private String lightReq;

    @Column(name = "waterReq", nullable = false)
    private String waterReq;

    @Column(name = "petFriendly", nullable = false)
    private String petFriendly;

    @Column(name = "addFeature", nullable = false)
    private String addFeature;
}
