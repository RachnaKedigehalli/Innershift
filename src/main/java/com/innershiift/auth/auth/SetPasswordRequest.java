package com.innershiift.auth.auth;

import com.innershiift.auth.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SetPasswordRequest {
    private String email;
    private String password;
    private String otp;
}

