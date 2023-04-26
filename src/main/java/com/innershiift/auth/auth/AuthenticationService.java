package com.innershiift.auth.auth;

import com.innershiift.auth.auth.emailToken.EmailToken;
import com.innershiift.auth.auth.emailToken.EmailTokenRepository;
import com.innershiift.auth.auth.emailToken.EmailTokenService;
import com.innershiift.auth.config.JwtService;
import com.innershiift.auth.config.RefreshToken;
import com.innershiift.auth.config.RefreshTokenException;
import com.innershiift.auth.config.RefreshTokenService;
import com.innershiift.auth.notification.NotificationService;
import com.innershiift.auth.notification.NotificationToken;
import com.innershiift.auth.user.Role;
import com.innershiift.auth.user.User;
import com.innershiift.auth.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
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
    private final UserDetailsService userDetailsService;
    private final NotificationService notificationService;
    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        repository.save(user);

        var notificationToken = NotificationToken.builder()
                        .token(request.getNotificationToken())
                        .patientId(user.getId())
                        .build();
        notificationService.addToken(notificationToken);
        var jwtToken = jwtService.generateToken(user);
        RefreshToken refToken = refreshTokenService.createRefreshToken(user.getEmail());
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .refreshToken(refToken)
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .id(user.getId())
                .role(user.getRole())
                .email(user.getEmail())
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

        var notificationToken = NotificationToken.builder()
                .token(request.getNotificationToken())
                .patientId(user.getId())
                .build();
        notificationService.addToken(notificationToken);

        var jwtToken = jwtService.generateToken(user);
        RefreshToken refToken = refreshTokenService.createRefreshToken(user.getEmail());
//        System.out.println("jwt " + jwtToken);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .refreshToken(refToken)
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole())
                .id(user.getId())
                .email(user.getEmail())
                .build();
    }

    public String logout(LogoutRequest request) {
        return notificationService.removeToken(request.getUserId(), request.getNotificationToken());
    }


    public TokenRefreshResponse refresh(TokenRefreshRequest request) {
        System.out.println("request in refresh: " + request);
        String requestRefreshToken = request.getRefreshToken();
        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(refreshToken->{
                    System.out.println("user in map: " + refreshToken);
                    return refreshToken.getUserEmail();
                })
                .map(userEmail -> {
                    System.out.println("user in map: " + userEmail);
                    UserDetails user = userDetailsService.loadUserByUsername(userEmail);
                    String token = jwtService.generateToken(user);
                    RefreshToken newRefreshToken = refreshTokenService.createRefreshToken(userEmail);
                    return TokenRefreshResponse.builder()
                            .accessToken(token)
                            .refreshToken(newRefreshToken.getToken())
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
