package com.innershiift.auth.user.Patient;

import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientResponseInterface {
    private Integer patientId;

    private Integer consultationId;

    private boolean status;

    private Integer registeredThrough;

    private Date dob;
    private String emergencyContact;
    private Integer gender;
    private String phoneNumber;
    private Integer condition;
    private String firstName;
    private String lastName;

    public PatientResponseInterface(Integer patientId, Integer registeredThrough, Date dob, String emergencyContact, Integer gender, String phoneNumber, Integer condition, String firstName, String lastName) {
        this.patientId = patientId;
        this.registeredThrough = registeredThrough;
        this.dob = dob;
        this.emergencyContact = emergencyContact;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.condition = condition;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}