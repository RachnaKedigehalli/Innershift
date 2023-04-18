package com.innershiift.auth.auth;

import com.innershiift.auth.auth.email.EmailRequest;
import com.innershiift.auth.auth.email.EmailResponse;
import com.innershiift.auth.auth.email.EmailService;
import com.innershiift.auth.auth.email.OTPConfirmationRequest;
import com.innershiift.auth.auth.emailToken.EmailToken;
import com.innershiift.auth.auth.emailToken.EmailTokenRepository;
import com.innershiift.auth.auth.emailToken.EmailTokenService;
import com.innershiift.auth.config.RefreshTokenService;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import com.innershiift.auth.config.RefreshToken;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;
    private final RefreshTokenService refreshTokenService;
    private final EmailService emailService;
    private final EmailTokenRepository emailTokenRepository;

    @PostMapping("/register")
    @CrossOrigin
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    @CrossOrigin
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/refreshtoken")
    @CrossOrigin
    public ResponseEntity<?> refreshtoken(@Valid @RequestBody TokenRefreshRequest request) {
        System.out.println("in refresh token "+ request.getRefreshToken());
        return ResponseEntity.ok(service.refresh(request));

    }

    @PostMapping("/getEmailOTP")
    @CrossOrigin
    public ResponseEntity<?> getOTP(@Valid @RequestBody EmailRequest request) {
        System.out.println("in verify email");
        String token = String.valueOf((int)(Math.floor(Math.random() *( 999999 - 100000 + 1) + 100000)));
        EmailToken emailToken = new EmailToken(
                token,
                request.getEmail(),
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15)
        );
        emailTokenRepository.save(emailToken);
        emailService.send(
                request.getEmail(),
                emailService.emailBuilder(token));

//        return ResponseEntity.ok();
        return ResponseEntity.ok(EmailResponse.builder()
                        .email(request.getEmail())
                        .status("sent")
                .build()
        );

    }

    @PostMapping("/confirmEmailOTP")
    @CrossOrigin
    public ResponseEntity<?> confirmOTP(@Valid @RequestBody OTPConfirmationRequest request) {
        try{
            String stat = service.confirmToken(request.getToken());
            return ResponseEntity.ok(EmailResponse.builder()
                    .email(request.getEmail())
                    .status("verified")
                    .build()
            );
        }
        catch(Exception e) {
            return ResponseEntity.notFound().build();
        }

    }

}
