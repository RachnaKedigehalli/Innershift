package com.innershiift.auth.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LogoutRequest {
    private Integer userId;
    private String notificationToken;
}
