package com.innershiift.auth.user.Patient;

import com.innershiift.auth.user.doctor.Doctor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Component
public class PatientService {

    private final  PatientRepository patientRepository;

    public Optional<Patient> register(Patient p){
        return  Optional.of(patientRepository.save(p));
    }


    public Optional<Patient> addPatient(Patient p){
        return  Optional.of(patientRepository.save(p));
    }
    public Optional<Patient> addPatient( Integer pid, String phoneNumber,Integer gender, String dob){
        Patient p = new Patient();
        p.setDob(dob);
        p.setPatientId(pid);
        p.setEmergencyContact("none");
        p.setPhoneNumber(phoneNumber);
        p.setGender(gender);
        p.setRegisteredThrough(1);// default 1

        return  Optional.of(patientRepository.save(p));
    }

    public Optional<Patient> updatePatientDOBByID(Integer id,String d){
        Optional<Patient> dbPatient = patientRepository.findById(id);
        if(dbPatient.isPresent()){
            patientRepository.updateDobByID(id,d);
            return  patientRepository.findById(id);
        }
        return dbPatient;
    }

    public Optional<Patient> updateEmergencyContactByID(Integer id,String contact){
        Optional<Patient> dbPatient = patientRepository.findById(id);
        if(dbPatient.isPresent()){
            patientRepository.updateEmergencyContactByID(id,contact);
            return  patientRepository.findById(id);
        }
        return dbPatient;
    }

    public Optional<Patient> updateGenderByID(Integer id,Integer gender){
        Optional<Patient> dbPatient = patientRepository.findById(id);
        if(dbPatient.isPresent()){
            patientRepository.updateGenderByID(id,gender);
            return  patientRepository.findById(id);
        }
        return dbPatient;
    }

    public  Optional<Patient> updatePhoneNumberByID(Integer id,String phoneNumber){
        Optional<Patient> dbPatient = patientRepository.findById(id);
        if(dbPatient.isPresent()){
            patientRepository.updatePhoneNumberByID(id,phoneNumber);
            return  patientRepository.findById(id);
        }
        return dbPatient;
    }

    public Optional<Patient> updateConditionByID(Integer id,Integer condition){
        Optional<Patient> dbPatient = patientRepository.findById(id);
        if(dbPatient.isPresent()){
            patientRepository.updateConditionByID(id,condition);
            return  patientRepository.findById(id);
        }
        return dbPatient;
    }

    public Optional<List<Patient>> getAllPatients(){
        return Optional.of(patientRepository.getAllPatientsWithGeneralConsent());
    }

    public Optional<PatientResponseInterface> getPatientByID(Integer id){
        return Optional.of(patientRepository.getPatientByPid(id));
    }

    public Patient getConsent(Integer patientId) {
        return patientRepository.findById(patientId).orElseThrow(()->new RuntimeException("getConsent failed"));
    }

    public Patient updateConsent(Patient patient) {
        if (patientRepository.findById(patient.getPatientId()).isPresent()) {
            patientRepository.updateConsentByID(patient.getPatientId(), patient.getDoctorConsent(), patient.getGeneralConsent());
            return patientRepository.findById(patient.getPatientId()).orElseThrow(()->new RuntimeException("updateConsent failed"));
        }
        else {
            throw new RuntimeException("Patient does not exist");
        }
    }
}
