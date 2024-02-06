package com.example.tinygarden.service.impl;

import com.example.tinygarden.dto.LoginDto;
import com.example.tinygarden.repository.CustomerRepository;
import com.example.tinygarden.response.LoginResponse;
import com.example.tinygarden.security.JwtService;
import com.example.tinygarden.service.LoginService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
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
    public LoginResponse authenticate(LoginDto loginDto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(), loginDto.getPassword()
                )
        );

        UserDetails userDetails = (UserDetails) customerRepository.getUserByEmail(loginDto.getEmail())
                .orElseThrow(() -> new EntityNotFoundException("User not found."));
        String jwtToken = jwtService.generateToken(userDetails);
        return LoginResponse.builder().token(jwtToken).build();
    }
}
