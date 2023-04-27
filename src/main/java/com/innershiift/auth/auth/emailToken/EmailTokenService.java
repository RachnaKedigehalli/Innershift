package com.innershiift.auth.auth.emailToken;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.validation.constraints.Email;
import java.time.LocalDateTime;
import java.util.List;
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
    public boolean isValidOTP(String token) {
        List<EmailToken> tl = emailTokenRepository.findAll();
        for(EmailToken t:tl){
            if(t.getToken().equals(token) && t.getConfirmedAt()==null) return true;
        }
        return false;
    }
}
