package com.example.tinygarden.response;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private Integer customerId;
    private String token;
    private String role;

    public LoginResponse(String incorrectEmail) {
    }
}
