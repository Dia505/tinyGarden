package com.example.tinygarden.service;

import com.example.tinygarden.dto.LoginDto;
import com.example.tinygarden.response.LoginResponse;

public interface LoginService {
    LoginResponse authenticate(LoginDto loginDto);
}
