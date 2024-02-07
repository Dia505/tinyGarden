package com.example.tinygarden.service;

import com.example.tinygarden.dto.LoginDto;
import com.example.tinygarden.response.LoginResponse;
import org.springframework.http.ResponseEntity;

public interface LoginService {
    ResponseEntity<LoginResponse> authenticate(LoginDto loginDto);
}
