package com.innershiift.auth.app;

import com.innershiift.auth.consultation.Consultation;
import com.innershiift.auth.consultation.ConsultationService;
import com.innershiift.auth.consultation.Message;
import com.innershiift.auth.user.Patient.Patient;
import com.innershiift.auth.user.doctor.Doctor;
import com.innershiift.auth.user.doctor.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/app")
@RequiredArgsConstructor
public class ApplicationController {

    private final DoctorService doctorService;
    private final ConsultationService consultationService;
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


}
