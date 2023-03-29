package com.innershiift.auth.app;

import com.innershiift.auth.Mood.Mood;
import com.innershiift.auth.Mood.MoodService;
import com.innershiift.auth.consultation.Consultation;
import com.innershiift.auth.consultation.ConsultationService;
import com.innershiift.auth.consultation.Message;
import com.innershiift.auth.user.Patient.Patient;
import com.innershiift.auth.user.Patient.PatientService;
import com.innershiift.auth.user.User;
import com.innershiift.auth.user.UserRepository;
import com.innershiift.auth.user.doctor.Doctor;
import com.innershiift.auth.user.doctor.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/app")
@RequiredArgsConstructor
public class ApplicationController {

    private final DoctorService doctorService;
    private final ConsultationService consultationService;
    private final MoodService moodService;
    private final PatientService patientService;
    private final UserRepository userRepository;

    @GetMapping
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hello from a secured endpoint!");
    }

    @PostMapping("/createDoctor")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Doctor> createDoctor(@Valid @RequestBody Doctor doc) {
        return ResponseEntity.ok(
                doctorService.createDoctor(doc)
                        .orElseThrow(()-> new IllegalStateException("Could not create doctor"))
        );
    }

    @PostMapping("/isConsulting")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<List<Consultation>> isConsulting(@Valid @RequestBody Patient p) {
        return ResponseEntity.ok(
                consultationService.getAllConsultationPerUser(p.getPatientId())
                        .orElseThrow(()-> new IllegalStateException("Could not find consultations"))
        );
    }

    @PostMapping("/addConsultation")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Consultation> addConsultation(@Valid @RequestBody Consultation cons) {
        return ResponseEntity.ok(
                consultationService.addConsultationBetweenUserId(cons.getDoctorId(), cons.getPatientId())
                        .orElseThrow(()-> new IllegalStateException("Could not add consultations"))
        );
    }

    @PostMapping("/addMessage")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Message> addMessage(@Valid @RequestBody Message m) {
        return ResponseEntity.ok(
                consultationService.addMessageToConsultation(m.getConsultationId(), m.getContent())
                        .orElseThrow(()-> new IllegalStateException("Could not add consultations"))
        );
    }

    @PostMapping("/addMood")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Mood> addMood(@Valid @RequestBody Mood m) {
        return ResponseEntity.ok(
                moodService.addMood(m));
    }

    @GetMapping("/getAllPatients")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<List<Patient>> getAllPatients(){
        return ResponseEntity.ok(
                patientService.getAllPatients()
                        .orElseThrow(()-> new IllegalStateException("Could not get all patients")
        ));
    }

    @PostMapping("/addPatient")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Patient> addPatient(@Valid @RequestBody Patient p){
        return ResponseEntity.ok(patientService.addPatient(p).orElseThrow(()-> new IllegalStateException("Could not add patient")));
    }
    @PostMapping("/addPatientWithPhone")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Patient> addPatient(@Valid @RequestBody Map<String, String> json){
        return ResponseEntity.ok(patientService.addPatient(json.get("phoneNumber"),Integer.parseInt( json.get("gender"))).orElseThrow(()-> new IllegalStateException("Could not add patient")));
    }

    @GetMapping("/getAllUsers")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("/getAllMessagesByPId")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<List<Message>> getAllMessagesByPId(@Valid @RequestBody Integer pid){
        return ResponseEntity.ok(consultationService.getAllMessagesByPid(pid));
    }

    @GetMapping("/acceptConsultation")
    @PreAuthorize("hasAuthority('DOCTOR')")
    public ResponseEntity<Consultation> acceptConsultation(@Valid @RequestBody Map<String, String> json){
        return  ResponseEntity.ok(consultationService.setConsultationStatus(Integer.parseInt(json.get("consultationId")),Boolean.parseBoolean(json.get("status"))).orElseThrow(()->new IllegalStateException("Unable to set Consultation status")));
    }

}
