package com.example.tinygarden.service;

import com.example.tinygarden.dto.CustomerDto;
import com.example.tinygarden.entity.Customer;
import com.example.tinygarden.response.OtpResponse;

import java.util.List;
import java.util.Optional;

public interface CustomerService {
    String save(CustomerDto customerDto);

    List<Customer> getAll();

    Optional<Customer> getById(Integer customerId);

    String deleteById(Integer customerId);

    String updateProfile(CustomerDto customerDto);

    OtpResponse generateOtpToEmail(String email);

    OtpResponse validateOtp(String email, String Otp);

    void updatePassword(String password, String email);
}
