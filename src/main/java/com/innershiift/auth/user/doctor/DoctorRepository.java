package com.innershiift.auth.user.doctor;


import com.innershiift.auth.user.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor,Integer> {

    @Transactional
    @Modifying
    @Query("UPDATE Doctor d SET d.licenseId= ?2 WHERE d.doctorId = ?1")
    // returns 1 for success
    int updateDoctorLicense(Integer id,String license);

    @Transactional
    @Modifying
    @Query("UPDATE Doctor d SET d.biography= ?2 WHERE d.doctorId = ?1")
        // returns 1 for success
    int updateDoctorBiography(Integer id,String biography);


    @Transactional
    @Modifying
    @Query("UPDATE Doctor d SET d.currentPos= ?2 WHERE d.doctorId = ?1")
        // returns 1 for success
    int updateDoctorCurrentPos(Integer id,String currentPos);


    @Transactional
    @Modifying
    @Query("UPDATE Doctor d SET d.phoneNumber= ?2 WHERE d.doctorId = ?1")
        // returns 1 for success
    int updateDoctorPhoneNumber(Integer id,String phoneNumber);


    @Transactional
    @Modifying
    @Query("UPDATE Doctor d SET d.degree= ?2 WHERE d.doctorId = ?1")
        // returns 1 for success
    int updateDoctorDegree(Integer id,String degree);


    @Transactional
    @Query("SELECT  new com.innershiift.auth.user.doctor.DoctorResponse(d.doctorId, d.biography, d.currentPos, d.degree, u.firstName, u.lastName) from Doctor d INNER JOIN User u on d.doctorId=u.id" )
        // returns 1 for success
    List<DoctorResponse> getAllDoctors();

    @Transactional
    @Query("SELECT new com.innershiift.auth.user.doctor.DoctorResponse(d.doctorId, d.biography, d.currentPos, d.degree, u.firstName, u.lastName) from Doctor d INNER JOIN User u on d.doctorId=u.id WHERE d.doctorId=?1" )
        // returns 1 for success
    DoctorResponse getDoctorById(Integer id);


}
