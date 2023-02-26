package com.innershiift.auth.auth;

import com.innershiift.auth.config.RefreshToken;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationResponse {
    private String token;
    private RefreshToken refreshToken;

    private String email;

    private String firstName;
    private String lastName;


    AuthenticationResponse(String token) {
        this.token = token;
    }
}

