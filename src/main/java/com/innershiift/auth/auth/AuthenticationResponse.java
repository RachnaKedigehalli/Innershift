package com.innershiift.auth.auth;

import com.innershiift.auth.config.RefreshToken;
import com.innershiift.auth.user.Role;
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
    private Integer id;
    private String firstName;
    private String lastName;

    private Role role;


    AuthenticationResponse(String token) {
        this.token = token;
    }
}

