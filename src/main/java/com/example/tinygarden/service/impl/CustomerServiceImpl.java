package com.example.tinygarden.service.impl;

import com.example.tinygarden.config.PasswordEncoderUtil;
import com.example.tinygarden.dto.CustomerDto;
import com.example.tinygarden.entity.Customer;
import com.example.tinygarden.repository.CustomerRepository;
import com.example.tinygarden.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;

    @Override
    public String save(CustomerDto customerDto) {
        Customer customer = new Customer();

        if(customerDto.getCustomerId() != null) {
            customer = customerRepository.findById(customerDto.getCustomerId())
                    .orElseThrow(() ->new NullPointerException("error"));
        }

        customer.setFullName(customerDto.getFullName());
        customer.setAddress(customerDto.getAddress());
        customer.setMobileNo(customerDto.getMobileNo());
        customer.setEmail(customerDto.getEmail());
        customer.setPassword(PasswordEncoderUtil.getInstance().encode(customerDto.getPassword()));

        customerRepository.save(customer);

        return "Data saved";
    }

    @Override
    public List<Customer> getAll() {
        return customerRepository.findAll();
    }

    @Override
    public Optional<Customer> getById(Integer customerId) {
        return  customerRepository.findById(customerId);
    }

    @Override
    public String deleteById(Integer customerId) {
        customerRepository.deleteById(customerId);
        return "Data deleted";
    }
}
