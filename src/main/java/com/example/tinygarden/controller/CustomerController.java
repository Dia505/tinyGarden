package com.example.tinygarden.controller;

import com.example.tinygarden.dto.CustomerDto;
import com.example.tinygarden.entity.Customer;
import com.example.tinygarden.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
}
