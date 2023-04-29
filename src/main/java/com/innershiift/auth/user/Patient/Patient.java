package com.innershiift.auth.user.Patient;


import com.innershiift.auth.config.Encrypt;
import com.innershiift.auth.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "_patient")
public class Patient {
    @Id
    private  Integer patientId;

    private Integer registeredThrough;

    @Convert(converter = Encrypt.class)
    private String dob;
    @Convert(converter = Encrypt.class)
    private String emergencyContact;
    private Integer gender;
    @Convert(converter = Encrypt.class)
    private String phoneNumber;
    private Integer condition;
}
