package com.innershiift.auth.user.doctor;

import com.innershiift.auth.config.Encrypt;
import jakarta.persistence.Convert;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorResponse {
    private Integer doctorId;
    private  String licenseId;
    private  String biography;
    private  String degree;
    private String currentPos;
    private String phoneNumber;

    private String firstName;
    private String lastName;

    public DoctorResponse(Integer doctorId, String biography, String currentPos, String degree,  String firstName, String lastName) {
        this.doctorId = doctorId;
        this.biography = biography;
        this.degree = degree;
        this.currentPos = currentPos;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
