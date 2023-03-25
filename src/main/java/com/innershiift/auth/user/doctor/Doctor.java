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

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table( name = "_doctor")
public class Doctor extends User {

    @Id
    @GeneratedValue
    private Integer doctorId;

    private  String licenseId;
    private  String biography;
    private  Integer degree;
    private String currentPos;
    private String phoneNumber;
}
