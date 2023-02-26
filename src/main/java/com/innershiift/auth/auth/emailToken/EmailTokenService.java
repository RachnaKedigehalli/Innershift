package com.innershiift.auth.auth.emailToken;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.validation.constraints.Email;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class EmailTokenService {
    private final EmailTokenRepository emailTokenRepository;


    public void saveConfirmationToken(EmailToken token) {
        emailTokenRepository.save(token);
    }

    public Optional<EmailToken> getToken(String token) {
        return emailTokenRepository.findByToken(token);
    }

    public int setConfirmedAt(String token) {
        return emailTokenRepository.updateConfirmedAt(
                token, LocalDateTime.now());
    }
}
