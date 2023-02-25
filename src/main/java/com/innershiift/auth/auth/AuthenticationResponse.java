package com.innershiift.auth.auth;

import com.innershiift.auth.config.RefreshToken;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationResponse {
    private String token;
    private RefreshToken refreshToken;

    AuthenticationResponse(String token) {
        this.token = token;
    }
}

