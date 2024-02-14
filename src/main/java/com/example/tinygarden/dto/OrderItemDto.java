package com.example.tinygarden.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDto {
    @NotNull
    private Integer plantId;
    @NotNull
    private Integer quantity;
    @NotNull
    private String plantName;
}
