package com.innershiift.auth.user.doctor;

import com.innershiift.auth.user.Patient.Patient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.print.Doc;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public Optional<List<DoctorResponse>> getAllDoctors(){
        return Optional.of(doctorRepository.getAllDoctors());
    }

    public  Optional<DoctorResponse> getDoctorByID(Integer id){
        return Optional.of(doctorRepository.getDoctorById(id));
    }

    public Optional<Doctor> updateDoctorLicense(Integer id,String license){
        Optional<Doctor> dbDoctor = doctorRepository.findById(id);
        if(dbDoctor.isPresent()){
            doctorRepository.updateDoctorLicense(id,license);
            return  doctorRepository.findById(id);
        }
        return dbDoctor;
    }

    public Optional<Doctor> updateDoctorBiography(Integer id,String bio){
        Optional<Doctor> dbDoctor = doctorRepository.findById(id);
        if(dbDoctor.isPresent()){
            doctorRepository.updateDoctorBiography(id,bio);
            return  doctorRepository.findById(id);
        }
        return dbDoctor;
    }

    public Optional<Doctor> updateDoctorDegree(Integer id,String degree){
        Optional<Doctor> dbDoctor = doctorRepository.findById(id);
        if(dbDoctor.isPresent()){
            doctorRepository.updateDoctorDegree(id,degree);
            return  doctorRepository.findById(id);
        }
        return dbDoctor;
    }

    public Optional<Doctor> updateDoctorCurrentPos(Integer id,String currentPos){
        Optional<Doctor> dbDoctor = doctorRepository.findById(id);
        if(dbDoctor.isPresent()){
            doctorRepository.updateDoctorCurrentPos(id,currentPos);
            return  doctorRepository.findById(id);
        }
        return dbDoctor;
    }

    public Optional<Doctor> updateDoctorPhoneNumber(Integer id,String phoneNumber){
        Optional<Doctor> dbDoctor = doctorRepository.findById(id);
        if(dbDoctor.isPresent()){
            doctorRepository.updateDoctorPhoneNumber(id,phoneNumber);
            return  doctorRepository.findById(id);
        }
        return dbDoctor;
    }

    public  Optional<Doctor> createDoctor(Doctor d){
        return Optional.of(doctorRepository.save(d));
    }

    public Optional<Doctor> addDoctor(String phoneNumber,String licenseId, Integer doctorId){
        Doctor d = new Doctor();
        d.setDoctorId(doctorId);
        d.setLicenseId(licenseId);
        d.setPhoneNumber(phoneNumber);
        d.setCurrentPos("");
        d.setBiography("");
        return  Optional.of(doctorRepository.save(d));
    }
}
