package com.innershiift.auth.user.doctor;


import com.innershiift.auth.config.Encrypt;
import com.innershiift.auth.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table( name = "_doctor")
public class Doctor {

    @Id
    private Integer doctorId;
    @Convert(converter = Encrypt.class)
    private  String licenseId;
    @Convert(converter = Encrypt.class)
    private  String biography;
    @Convert(converter = Encrypt.class)
    private  String degree;
    @Convert(converter = Encrypt.class)
    private String currentPos;
    @Convert(converter = Encrypt.class)
    private String phoneNumber;
}
