package com.innershiift.auth.auth.emailToken;


import com.innershiift.auth.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class EmailToken {
    @SequenceGenerator(
            name = "email_token_sequence",
            sequenceName = "email_token_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "email_token_sequence"
    )
    private Long id;

    @Column(nullable = false)
    private String token;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime expiresAt;

    private LocalDateTime confirmedAt;

//    @ManyToOne
//    @JoinColumn(
//            nullable = false,
//            name = "id"
//    )
//    private User appUser;
//
    public EmailToken(String token,
                             String email,
                             LocalDateTime createdAt,
                             LocalDateTime expiresAt
//                             User appUser
    ) {
        this.token = token;
        this.email = email;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
//        this.appUser = appUser;
    }


}
