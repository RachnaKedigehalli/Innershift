package com.innershiift.auth.auth.email;

public interface EmailSender {
    void send(String to, String email);
}
