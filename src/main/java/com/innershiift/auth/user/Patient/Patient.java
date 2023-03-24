package com.innershiift.auth.user.Patient;


import com.innershiift.auth.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "_patient")
public class Patient extends User {
    @Id
    @GeneratedValue
    private  Integer patientId;

    private Integer registeredThrough;

    private Date dob;
    private String emergencyContact;
    private Integer gender;
    private String phoneNumber;
    private Integer condition;
}
