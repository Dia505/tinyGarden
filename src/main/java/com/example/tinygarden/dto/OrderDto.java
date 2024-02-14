package com.example.tinygarden.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private Integer orderId;
    @NotNull
    private Integer customerId;
    @NotNull
    private Date date;
    @NotNull
    private Double totalPrice;
    private List<OrderItemDto> orderItems;
}
