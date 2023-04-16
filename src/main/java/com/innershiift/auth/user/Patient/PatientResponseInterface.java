package com.innershiift.auth.user.Patient;

import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientResponseInterface {
    private Integer patientId;

    private Integer registeredThrough;

    private Date dob;
    private String emergencyContact;
    private Integer gender;
    private String phoneNumber;
    private Integer condition;
    private String firstName;
    private String lastName;
}