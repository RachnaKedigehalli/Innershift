package com.innershiift.auth.app;

import com.innershiift.auth.Module.Module;
import com.innershiift.auth.Module.ModuleAssignment;
import com.innershiift.auth.Module.ModuleService;
import com.innershiift.auth.Mood.Mood;
import com.innershiift.auth.Mood.MoodService;
import com.innershiift.auth.consultation.Consultation;
import com.innershiift.auth.consultation.ConsultationService;
import com.innershiift.auth.consultation.Message;
import com.innershiift.auth.user.Patient.Patient;
import com.innershiift.auth.user.Patient.PatientResponseInterface;
import com.innershiift.auth.user.Patient.PatientService;
import com.innershiift.auth.user.Role;
import com.innershiift.auth.user.User;
import com.innershiift.auth.user.UserRepository;
import com.innershiift.auth.user.doctor.Doctor;
import com.innershiift.auth.user.doctor.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.print.Doc;
import javax.validation.Valid;
import java.security.Principal;
import java.util.ArrayList;
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

    private final SimpMessagingTemplate simpMessagingTemplate;

    private final ModuleService moduleService;

    @CrossOrigin
    @GetMapping
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hello from a secured endpoint!");
    }


    @PostMapping("/createDoctor")
    @CrossOrigin
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Doctor> createDoctor(@Valid @RequestBody Doctor doc) {
        Optional<Doctor> od= doctorService.createDoctor(doc);
        od.ifPresent((doctor)-> userRepository.updateRole(doctor.getDoctorId(), Role.DOCTOR));
        return ResponseEntity.ok(od
                        .orElseThrow(()-> new IllegalStateException("Could not create doctor"))
        );
    }


    @GetMapping("/getAllDoctors")
    @CrossOrigin
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public ResponseEntity<List<Object>> getAllDoctors() {
        return ResponseEntity.ok(
                doctorService.getAllDoctors()
                        .orElseThrow(()-> new IllegalStateException("Could not get doctors"))
        );
    }

    @PostMapping("/getDoctorById")
    @CrossOrigin
    @PreAuthorize("hasAnyAuthority('USER', 'DOCTOR', 'ADMIN')")
    public ResponseEntity<Object> getDoctorById(@Valid @RequestBody Doctor d) {
        System.out.println("doctor: " + d);
        return ResponseEntity.ok(
                doctorService.getDoctorByID(d.getDoctorId())
                        .orElseThrow(()-> new IllegalStateException("Could not get doctor"))
        );
    }

    @PostMapping("/isConsulting")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    @CrossOrigin
    public ResponseEntity<List<Consultation>> isConsulting(@Valid @RequestBody Patient p) {
        return ResponseEntity.ok(
                consultationService.getAllConsultationPerUser(p.getPatientId())
                        .orElseThrow(()-> new IllegalStateException("Could not find consultations"))
        );
    }

    @PostMapping("/addConsultation")
    @PreAuthorize("hasAuthority('USER')")
    @CrossOrigin
    public ResponseEntity<Consultation> addConsultation(@Valid @RequestBody Consultation cons) {
        return ResponseEntity.ok(
                consultationService.addConsultationBetweenUserId(cons.getDoctorId(), cons.getPatientId())
                        .orElseThrow(()-> new IllegalStateException("Could not add consultations"))
        );
    }

//    @PostMapping("/addMessage")
//    @PreAuthorize("hasAuthority('USER')")
//    @CrossOrigin
//    public ResponseEntity<Message> addMessage(@Valid @RequestBody Message m) {
//        return ResponseEntity.ok(
//                consultationService.addMessageToConsultation(m.getConsultationId(), m.getContent(), m.getSenderId(), m.getRecipientId())
//                        .orElseThrow(()-> new IllegalStateException("Could not add consultations"))
//        );
//    }

    @PostMapping("/addMood")
    @PreAuthorize("hasAuthority('USER')")
    @CrossOrigin
    public ResponseEntity<Mood> addMood(@Valid @RequestBody Mood m) {
        return ResponseEntity.ok(
                moodService.addMood(m));
    }

    @PostMapping("/isMoodSet")
    @PreAuthorize("hasAuthority('USER')")
    @CrossOrigin
    public ResponseEntity<Boolean> isMoodSet(@Valid @RequestBody Mood m) {
        return ResponseEntity.ok(
                moodService.isMoodSet(m.getPatientId()));
    }

    @PostMapping("/getMoodsByPid")
    @PreAuthorize("hasAuthority('DOCTOR')")
    @CrossOrigin
    public ResponseEntity<List<Mood>> getMoodsByPid(@Valid @RequestBody Patient p) {
        return ResponseEntity.ok(
                moodService.getMoodByPatientId(p.getPatientId()));
    }

    @GetMapping("/getAllPatients")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @CrossOrigin
    public ResponseEntity<List<PatientResponseInterface>> getAllPatients(){
        return ResponseEntity.ok(
                patientService.getAllPatients()
                        .orElseThrow(()-> new IllegalStateException("Could not get all patients")
        ));
    }

    @PostMapping("/getPatientByPid")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'DOCTOR')")
    @CrossOrigin
    public ResponseEntity<PatientResponseInterface> getPatientByPid(@Valid @RequestBody Patient p){
        return ResponseEntity.ok(
                patientService.getPatientByID(p.getPatientId())
                        .orElseThrow(()-> new IllegalStateException("Could not get all patients")
                        ));
    }

    @PostMapping("/getPatientsByDoctor")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'DOCTOR')")
    @CrossOrigin
    public ResponseEntity<List<PatientResponseInterface>> getPatientsByDoctor(@Valid @RequestBody Doctor d){
        List<PatientResponseInterface> ret = new ArrayList<>();
        consultationService.getAllConsultationPerUser(d.getDoctorId()).ifPresent((cons)->{

            for(Consultation c: cons) {
                patientService.getPatientByID(c.getPatientId()).ifPresent((pr)->{
                    pr.setConsultationId(c.getConsultationId());
                    pr.setStatus(c.getStatus());
                    ret.add(pr);
                });
            }

        });
        return ResponseEntity.ok(ret);
    }

    @PostMapping("/addPatient")
    @PreAuthorize("hasAuthority('USER')")
    @CrossOrigin
    public ResponseEntity<Patient> addPatient(@Valid @RequestBody Patient p){
        System.out.println("inside add patient, " + p);
        return ResponseEntity.ok(patientService.addPatient(p).orElseThrow(()-> new IllegalStateException("Could not add patient")));
    }
    @PostMapping("/addPatientWithPhone")
    @PreAuthorize("hasAuthority('USER')")
    @CrossOrigin
    public ResponseEntity<Patient> addPatientByPhoneNumberAndGender(@Valid @RequestBody Patient p){
        return ResponseEntity.ok(patientService.addPatient(p.getPatientId(), p.getPhoneNumber(), p.getGender()).orElseThrow(()-> new IllegalStateException("Could not add patient")));
    }

    @GetMapping("/getAllUsers")
    @PreAuthorize("hasAuthority('ADMIN')")
    @CrossOrigin
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PostMapping("/getAllMessagesByPId")
    @PreAuthorize("hasAnyAuthority('USER', 'DOCTOR')")
    @CrossOrigin
    public ResponseEntity<List<Message>> getAllMessagesByPId(@Valid @RequestBody Patient p){
        return ResponseEntity.ok(consultationService.getAllMessagesByPid(p.getPatientId()));
    }

    @PostMapping("/acceptConsultation")
    @PreAuthorize("hasAuthority('DOCTOR')")
    @CrossOrigin
    public ResponseEntity<Consultation> acceptConsultation(@Valid @RequestBody Consultation c){
        return  ResponseEntity.ok(consultationService.setConsultationStatus(c.getConsultationId(),c.getStatus()).orElseThrow(()->new IllegalStateException("Unable to set Consultation status")));
    }

    @MessageMapping("/chat")
//    @PreAuthorize("hasAnyAuthority('USER')")
    @CrossOrigin
    public void processMessage(@Payload Message chatMessage) {
        System.out.println("message : " + chatMessage);
        Message m = consultationService.addMessageToConsultation(chatMessage.getConsultationId(), chatMessage.getContent(), chatMessage.getSenderId(), chatMessage.getRecipientId()).orElseThrow(()-> new IllegalStateException("Could not add consultations"));

        simpMessagingTemplate.convertAndSendToUser(
                m.getConsultationId().toString(),"/queue/messages",
                m);
    }

    @GetMapping("/messages/{id}")
//    @PreAuthorize("hasAnyAuthority('USER')")
    @CrossOrigin
    public ResponseEntity<?> findMessage ( @PathVariable Integer id) {
        return ResponseEntity
                .ok(consultationService.getAllMessageForConsultationId(id));
    }



    @PostMapping("/addModule")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @CrossOrigin
    public ResponseEntity<Module> addModule(@Valid @RequestBody Module m) {
        return ResponseEntity.ok(
                moduleService.addModule(m.getContent()).orElseThrow(()->new RuntimeException("Couldn't add module"))
        );
    }

    @PostMapping("/assignModule")
    @PreAuthorize("hasAnyAuthority('DOCTOR')")
    @CrossOrigin
    public ResponseEntity<ModuleAssignment> assignModule(@Valid @RequestBody ModuleAssignment ma) {
        return ResponseEntity.ok(
                moduleService.assignModule(ma.getPatientId(), ma.getModuleId(), ma.getScheduled(), ma.getStart_timestamp(), ma.getDuration(), ma.getStatus()).orElseThrow(()->new RuntimeException("Couldn't assign module"))
        );
    }

    @GetMapping("/getAllModules")
    @PreAuthorize("hasAnyAuthority('ADMIN','DOCTOR')")
    @CrossOrigin
    public ResponseEntity<List<Module>> getAllModules() {
        return ResponseEntity.ok(
                moduleService.getAllModules().orElseThrow(()->new RuntimeException("Couldn't get all modules"))
        );
    }

    @PostMapping("/getModulesByPid")
    @PreAuthorize("hasAnyAuthority('DOCTOR')")
    @CrossOrigin
    public ResponseEntity<List<Module>> getModulesByPid(@Valid @RequestBody Patient p) {
        return ResponseEntity.ok(
                moduleService.getModulesByPid(p.getPatientId()).orElseThrow(()->new RuntimeException("Couldn't assign module"))
        );
    }

    @PostMapping("/updateOrder")
    @PreAuthorize("hasAnyAuthority('DOCTOR')")
    @CrossOrigin
    public ResponseEntity<?> updateOrderByModuleAssignedId(@Valid @RequestBody ModuleAssignment ma) {
        moduleService.updateOrderByModuleAssignedId(ma.getModuleAssignedId(), ma.getScheduled());
        return ResponseEntity.ok().build();
    }



}
