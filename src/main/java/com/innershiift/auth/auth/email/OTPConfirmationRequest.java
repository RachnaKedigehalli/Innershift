package com.innershiift.auth.auth.email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OTPConfirmationRequest {
    private String token;
    private String email;
}
