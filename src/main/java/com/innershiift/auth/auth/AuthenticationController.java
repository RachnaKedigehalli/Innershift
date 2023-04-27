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
    private final EmailTokenService emailTokenService;
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

    @PostMapping("/setPassword")
    @CrossOrigin
    public ResponseEntity<Integer> setPassword(
            @RequestBody SetPasswordRequest request
    ) {
        return ResponseEntity.ok(service.setPassword(request));
    }


    @PostMapping("/forgotPassword")
    @CrossOrigin
    public ResponseEntity<?> forgotPassword(@RequestBody String email){
        System.out.println("in Forgot password OH NOOOOOO!!!");
        String token = String.valueOf((int)(Math.floor(Math.random() *( 999999 - 100000 + 1) + 100000)));
        EmailToken emailToken = new EmailToken(
                token,
                email,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15)
        );
        emailTokenRepository.save(emailToken);
        emailService.send(
                email,
                emailService.emailBuilder(token));

//        return ResponseEntity.ok();
        return ResponseEntity.ok(EmailResponse.builder()
                .email(email)
                .status("sent")
                .build()
        );
    }
    @PostMapping("/confirmForgotPasswordOTP")
    @CrossOrigin
    public ResponseEntity<?> confirmForgotPasswordOTP(@Valid @RequestBody OTPConfirmationRequest request) {
        try{
//            String stat = service.confirmToken(request.getToken());
            System.out.println("Here in confirm passwd");
            if(emailTokenService.isValidOTP(request.getToken())==false) {
                System.out.println("trying to throw");throw new Exception("Invalid OTP");}
            return ResponseEntity.ok(service.GetNewRefreshAndJWTTokens(request.getEmail()));
        }
        catch(Exception e) {
            return ResponseEntity.notFound().build();
        }

    }


    @PostMapping("/authenticate")
    @CrossOrigin
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }
    @PostMapping("/logout")
    @CrossOrigin
    public ResponseEntity<String> logout(
           @Valid @RequestBody LogoutRequest request
    ) {
        return ResponseEntity.ok(service.logout(request));
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
