package com.innershiift.auth.user.doctor;


import com.innershiift.auth.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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

    private  String licenseId;
    private  String biography;
    private  String degree;
    private String currentPos;
    private String phoneNumber;
}
