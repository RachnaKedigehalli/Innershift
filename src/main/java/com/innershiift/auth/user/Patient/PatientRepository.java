package com.innershiift.auth.user.Patient;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;

public interface PatientRepository extends JpaRepository<Patient, Integer> {

    @Transactional
    @Modifying
    @Query("UPDATE _patient p SET p.dob= ?2 WHERE p.patientId = ?1")
    int updateDobByID(Integer id, Date dob);

    @Transactional
    @Modifying
    @Query("UPDATE _patient p SET p.emergencyContact= ?2 WHERE p.patientId = ?1")
    int updateEmergencyContactByID(Integer id,String emergencyContact);

    @Transactional
    @Modifying
    @Query("UPDATE _patient p SET p.gender= ?2 WHERE p.patientId = ?1")
    int updateGenderByID(Integer id,Integer gender);

    @Transactional
    @Modifying
    @Query("UPDATE _patient p SET p.phoneNumber= ?2 WHERE p.patientId = ?1")
    int updatePhoneNumberByID(Integer id,String phoneNumber);

    @Transactional
    @Modifying
    @Query("UPDATE _patient p SET p.condition= ?2 WHERE p.patientId = ?1")
    int updateConditionByID(Integer id,Integer condition);
}