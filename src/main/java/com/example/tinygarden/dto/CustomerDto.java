package com.example.tinygarden.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDto {
    private Integer customerId;
    @NotNull
    private String fullName;
    @NotNull
    private String address;
    @NotNull
    private String mobileNo;
    @NotNull
    private String email;
    @NotNull
    private String password;
}
