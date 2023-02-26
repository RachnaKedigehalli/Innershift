package com.innershiift.auth.auth;

import com.innershiift.auth.auth.emailToken.EmailToken;
import com.innershiift.auth.auth.emailToken.EmailTokenRepository;
import com.innershiift.auth.auth.emailToken.EmailTokenService;
import com.innershiift.auth.config.JwtService;
import com.innershiift.auth.config.RefreshToken;
import com.innershiift.auth.config.RefreshTokenException;
import com.innershiift.auth.config.RefreshTokenService;
import com.innershiift.auth.user.Role;
import com.innershiift.auth.user.User;
import com.innershiift.auth.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;


    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;
    private final RefreshTokenService refreshTokenService;

    private final EmailTokenService emailTokenService;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        repository.save(user);

        var jwtToken = jwtService.generateToken(user);
        RefreshToken refToken = refreshTokenService.createRefreshToken(user.getEmail());
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .refreshToken(refToken)
                .build();
//        return null;
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        UsernamePasswordAuthenticationToken tok = new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
        );
//        System.out.println("Auth token " + tok);
            authenticationManager.authenticate(
                    tok
            );
//        System.out.println("here before user");
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
//        System.out.println("user " + user);
        var jwtToken = jwtService.generateToken(user);
        RefreshToken refToken = refreshTokenService.createRefreshToken(user.getEmail());
//        System.out.println("jwt " + jwtToken);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .refreshToken(refToken)
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .build();
    }


    public AuthenticationResponse refresh(TokenRefreshRequest request) {
        System.out.println("request in refresh: " + request);
        String requestRefreshToken = request.getRefreshToken();
        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String token = jwtService.generateToken(user);
                    return AuthenticationResponse.builder()
                            .token(token)
                            .email(user.getEmail())
                            .firstName(user.getFirstName())
                            .lastName(user.getLastName())
                            .build();
                })
                .orElseThrow(() -> new RefreshTokenException(requestRefreshToken,
                        "Refresh token is not in database!"));

    }
    public String confirmToken(String token) {
        EmailToken confirmationToken = emailTokenService
                .getToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        emailTokenService.setConfirmedAt(token);
//        appUserService.enableAppUser(
//                confirmationToken.getAppUser().getEmail());
        return "confirmed";
    }
}
