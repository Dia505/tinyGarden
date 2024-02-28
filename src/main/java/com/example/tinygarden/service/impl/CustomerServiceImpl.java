package com.example.tinygarden.service.impl;

import com.example.tinygarden.config.PasswordEncoderUtil;
import com.example.tinygarden.dto.CustomerDto;
import com.example.tinygarden.entity.Customer;
import com.example.tinygarden.repository.CustomerRepository;
import com.example.tinygarden.response.OtpResponse;
import com.example.tinygarden.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender javaMailSender;

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

    @Override
    public String updateProfile(CustomerDto customerDto) {
        Customer existingCustomer = customerRepository.findById(customerDto.getCustomerId()).orElseThrow(() ->new NullPointerException("error"));;
        existingCustomer.setFullName(customerDto.getFullName());
        existingCustomer.setAddress(customerDto.getAddress());
        existingCustomer.setMobileNo(customerDto.getMobileNo());
        existingCustomer.setEmail(customerDto.getEmail());
        customerRepository.save(existingCustomer);
        return "Profile updated";
    }

    public String generateOtp(){
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    @Override
    public OtpResponse generateOtpToEmail(String email) {
        SimpleMailMessage message = new SimpleMailMessage();
        Optional<Customer> customerOptional = customerRepository.getUserByEmail(email);
        if(customerOptional.isPresent()){
            String otp = generateOtp();
            customerRepository.updateOtp(otp,email);
            message.setTo(email);
            message.setSubject("Tiny Garden password reset OTP");
            message.setText("Your OTP for password reset is: " + otp);
            javaMailSender.send(message);
            return new OtpResponse("OTP Sent");
        }
        else {
            return new OtpResponse("Email does not exist");
        }
    }

    @Override
    public OtpResponse validateOtp(String email, String otp) {
        String receivedOtp = customerRepository.otp(email);
        if(Objects.equals(otp,receivedOtp)){
            return new OtpResponse("Success");
        }
        else {
            return new OtpResponse("Unsuccessful");
        }
    }

    @Override
    public void updatePassword(String password, String email) {
        String encodedPassword = this.passwordEncoder.encode(password);
        customerRepository.updatePassword(encodedPassword,email);
    }

}
