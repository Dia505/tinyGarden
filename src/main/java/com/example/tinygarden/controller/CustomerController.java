package com.example.tinygarden.controller;

import com.example.tinygarden.dto.CustomerDto;
import com.example.tinygarden.entity.Customer;
import com.example.tinygarden.response.OtpResponse;
import com.example.tinygarden.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/customer")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;

    @PostMapping("/save-customer-details")
    public String insertData(@RequestBody CustomerDto customerDto) {
        customerService.save(customerDto);
        return "Data saved";
    }

    @GetMapping("/get-all-data")
    public List<Customer> getAllData() {
        return customerService.getAll();
    }

    @GetMapping("/get-by-id/{customerId}")
    public Optional<Customer> getById(@PathVariable("customerId") Integer customerId) {
        return customerService.getById(customerId);
    }

    @DeleteMapping("/delete-by-id/{customerId}")
    public String deleteById(@PathVariable("customerId") Integer customerId) {
        customerService.deleteById(customerId);
        return "Data deleted";
    }

    @GetMapping("/customer-record")
    public ResponseEntity<Object> findAllRecords() {
        List<Customer> customers = customerService.getAll();
        int totalRecords = customers.size();
        Map<String, Object> response = new HashMap<>();
        response.put("totalRecords", totalRecords);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/update-profile")
    public String updateProfile(@RequestBody CustomerDto customerDto) {
        customerService.updateProfile(customerDto);
        return "Profile updated";
    }

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody CustomerDto customerDto){
        OtpResponse otpResponse = customerService.generateOtpToEmail(customerDto.getEmail());
        return ResponseEntity.ok(otpResponse);
    }

    @PostMapping("/validate-otp")
    public ResponseEntity<?> validateOtp(@RequestBody CustomerDto customerDto){
        OtpResponse otpResponse = customerService.validateOtp(customerDto.getEmail(),customerDto.getOtp());
        return ResponseEntity.ok(otpResponse);
    }

    @PostMapping("/password-reset")
    public String resetPassword(@RequestBody CustomerDto customerDto){
        customerService.updatePassword(customerDto.getPassword(),customerDto.getEmail());
        return "Password reset complete";
    }

}
