package com.innershiift.auth.user.doctor;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public Optional<List<Object>> getAllDoctors(){
        return Optional.of(doctorRepository.getAllDoctors());
    }

    public  Optional<Doctor> getDoctorByID(Integer id){
        return doctorRepository.findById(id);
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

}
