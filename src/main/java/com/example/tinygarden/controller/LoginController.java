package com.example.tinygarden.controller;

import com.example.tinygarden.dto.LoginDto;
import com.example.tinygarden.response.LoginResponse;
import com.example.tinygarden.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class LoginController {
    private final LoginService loginService;

    @PostMapping("/authenticate")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginDto loginDto) {

        return loginService.authenticate(loginDto);
    }
}
