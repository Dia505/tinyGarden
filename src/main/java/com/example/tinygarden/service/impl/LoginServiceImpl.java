package com.example.tinygarden.service.impl;

import com.example.tinygarden.dto.LoginDto;
import com.example.tinygarden.entity.Customer;
import com.example.tinygarden.repository.CustomerRepository;
import com.example.tinygarden.response.LoginResponse;
import com.example.tinygarden.security.JwtService;
import com.example.tinygarden.service.LoginService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {
    private final CustomerRepository customerRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Override
    public ResponseEntity<LoginResponse> authenticate(LoginDto loginDto) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getEmail(), loginDto.getPassword()
                    )
            );

            Customer customer=  customerRepository.getUserByEmail(loginDto.getEmail())
                    .orElseThrow(() -> new EntityNotFoundException("User not found."));

            UserDetails userDetails = customer;

            String jwtToken = jwtService.generateToken(userDetails);
            return ResponseEntity.ok(LoginResponse.builder().token(jwtToken)
                    .customerId(customer.getCustomerId())
                            .role(customer.getCustomerId()==0?"admin":"customer")
                    .build());
        }
        catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponse("Incorrect email"));
        }
        catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponse("Incorrect password"));
        }
    }
}
