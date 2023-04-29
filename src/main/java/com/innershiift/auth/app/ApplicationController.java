package com.innershiift.auth.app;

import com.innershiift.auth.Module.*;
import com.innershiift.auth.Module.Module;
import com.innershiift.auth.Mood.Mood;
import com.innershiift.auth.Mood.MoodService;
import com.innershiift.auth.Referral.Referral;
import com.innershiift.auth.Referral.ReferralRequest;
import com.innershiift.auth.Referral.ReferralService;
import com.innershiift.auth.consultation.Consultation;
import com.innershiift.auth.consultation.ConsultationService;
import com.innershiift.auth.consultation.Message;
import com.innershiift.auth.diagnosis.Diagnosis;
import com.innershiift.auth.diagnosis.DiagnosisService;
import com.innershiift.auth.notification.NotificationService;
import com.innershiift.auth.user.Patient.Patient;
import com.innershiift.auth.user.Patient.PatientResponseInterface;
import com.innershiift.auth.user.Patient.PatientService;
import com.innershiift.auth.user.Role;
import com.innershiift.auth.user.User;
import com.innershiift.auth.user.UserRepository;
import com.innershiift.auth.user.UserService;
import com.innershiift.auth.user.doctor.Doctor;
import com.innershiift.auth.user.doctor.DoctorResponse;
import com.innershiift.auth.user.doctor.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/app")
@RequiredArgsConstructor
public class ApplicationController {

    private final DoctorService doctorService;
    private final ReferralService referralService;
    private final ConsultationService consultationService;
    private final MoodService moodService;
    private final PatientService patientService;
    private final UserRepository userRepository;

    private final UserService userService;

    private final SimpMessagingTemplate simpMessagingTemplate;

    private final ModuleService moduleService;
    private final NotificationService notificationService;
    private final ModuleAssignmentRepository moduleAssignmentRepository;
    private final ModuleRepository moduleRepository;

    private final DiagnosisService diagnosisService;

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
    public ResponseEntity<List<DoctorResponse>> getAllDoctors() {
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
                consultationService.addConsultationBetweenUserId(cons.getDoctorId(), cons.getPatientId(), false)
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

    @PostMapping("/getMoodsByDate")
    @PreAuthorize("hasAuthority('ADMIN')")
    @CrossOrigin
    public ResponseEntity<List<Mood>> getMoodsByDate(@Valid @RequestBody Mood m) {
        return ResponseEntity.ok(
                moodService.getMoodByDate(m.getDate()));
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
        return ResponseEntity.ok(patientService.addPatient(p.getPatientId(), p.getPhoneNumber(), p.getGender(), p.getDob()).orElseThrow(()-> new IllegalStateException("Could not add patient")));
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
        notificationService.sendNotificationToPatient(c.getPatientId(), "Doctor has accepted your consultation request", "");
        return  ResponseEntity.ok(consultationService.setConsultationStatus(c.getConsultationId(),c.getStatus()).orElseThrow(()->new IllegalStateException("Unable to set Consultation status")));
    }

    @MessageMapping("/chat")
//    @PreAuthorize("hasAnyAuthority('USER')")
    @CrossOrigin
    public void processMessage(@Payload Message chatMessage) {
        System.out.println("message : " + chatMessage);
        Message m = consultationService.addMessageToConsultation(chatMessage.getConsultationId(), chatMessage.getContent(), chatMessage.getSenderId(), chatMessage.getRecipientId()).orElseThrow(()-> new IllegalStateException("Could not add consultations"));
        userService.getUserById(chatMessage.getSenderId()).ifPresent((d)->{
            notificationService.sendNotificationToPatient(chatMessage.getRecipientId(), "New message from Dr. "+ d.getFirstName() + " " + d.getLastName(), chatMessage.getContent());
        });

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


    @PostMapping("/deleteAssignmentById")
    @PreAuthorize("hasAnyAuthority('DOCTOR')")
    @CrossOrigin
    public ResponseEntity<ModuleAssignment> deleteAssignmentById(@Valid @RequestBody Integer maId) {
        return ResponseEntity.ok(
          moduleService.deleteAssignmentById(maId).orElseThrow(()->new RuntimeException("Couldn't delete module"))
        );
    }

    @PostMapping("/sendModuleResponse")
    @PreAuthorize("hasAnyAuthority('USER')")
    @CrossOrigin
    public ResponseEntity<ModuleAssignment> updateModuleResponse(@Valid @RequestBody ModuleAssignment ma) {
        System.out.println("Here in update module response!");
        return ResponseEntity.ok(
               moduleService.updateModuleResponse(ma.getModuleAssignedId(),ma.getResponse(),ma.getStart_timestamp(),ma.getDuration(), ma.getStatus()).orElseThrow(()->new RuntimeException("Couldn't delete module"))
        );
    }


    // change name of the function locked status
    @PostMapping("/setLockedForModule")
    @PreAuthorize("hasAnyAuthority('DOCTOR')")
    @CrossOrigin
    public ResponseEntity<ModuleAssignment> setLockedStatus(@Valid @RequestBody ModuleStatus ms) {
        System.out.println("in the controller to set locked status");
        return ResponseEntity.ok(
                moduleService.setModuleLocked(ms.getId(),ms.getLocked()).orElseThrow(()->new RuntimeException("Couldn't set status"))
        );
    }


    @PostMapping("/assignModule")
    @PreAuthorize("hasAnyAuthority('DOCTOR')")
    @CrossOrigin
    public ResponseEntity<ModuleAssignment> assignModule(@Valid @RequestBody ModuleAssignment ma) {
        return ResponseEntity.ok(
                moduleService.assignModule(ma.getPatientId(), ma.getModuleId(), ma.getScheduled()).orElseThrow(()->new RuntimeException("Couldn't assign module"))
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
    @PreAuthorize("hasAnyAuthority('DOCTOR', 'USER')")
    @CrossOrigin
    public ResponseEntity<List<ModuleResponse>> getModulesByPid(@Valid @RequestBody Patient p) {
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


    @PostMapping("/getReferralByDoctor")
    @PreAuthorize("hasAnyAuthority('DOCTOR')")
    @CrossOrigin
    public ResponseEntity<Referral> getReferralByDoctor(@Valid @RequestBody Doctor d){
        Optional<Referral> ret = referralService.getReferralByDoctor(d);
        if(ret.isPresent()) {
            return  ResponseEntity.ok(ret.get());
        }
        else {
            Optional<Referral> r = referralService.generateReferralForDoctor(d);
            return  ResponseEntity.ok(r.orElseThrow(()-> new RuntimeException("couldn't generate referral")));
        }

    }

    @PostMapping("/getDoctorByReferral")
    @PreAuthorize("hasAnyAuthority('USER')")
    @CrossOrigin
    public ResponseEntity<DoctorResponse> getDoctorByReferral(@Valid @RequestBody ReferralRequest referral){
        Optional<Integer> dret = referralService.getDoctorByReferral(referral.getReferral());
        if(dret.isPresent()){
            Optional<DoctorResponse> doc = doctorService.getDoctorByID(dret.get());
            consultationService.addConsultationBetweenUserId(dret.get(), referral.getPatientId(), true);
            if(doc.isPresent()){
                return ResponseEntity.ok(doc.orElse(null));
            }
           else return ResponseEntity.notFound().build();
        }
        else return ResponseEntity.notFound().build();
    }

    @PostMapping("/addDiagnosis")
    @PreAuthorize("hasAnyAuthority('DOCTOR')")
    @CrossOrigin
    public ResponseEntity<Diagnosis> addDiagnosis(@Valid @RequestBody Diagnosis d){
        return ResponseEntity.ok(diagnosisService.addDiagnosis(d.getConsultationId(), d.getDiagnosis(), d.getDate()).orElseThrow(()-> new RuntimeException("couldn't add diagnosis")));
    }

    @PostMapping("/getDiagnosisByCid")
    @PreAuthorize("hasAnyAuthority('DOCTOR')")
    @CrossOrigin
    public ResponseEntity<List<Diagnosis>> getDiagnosisByCid(@Valid @RequestBody Diagnosis d){
        return ResponseEntity.ok(diagnosisService.getAllDiagnosisByCid(d.getConsultationId()).orElseThrow(()-> new RuntimeException("couldn't get diagnosis")));
    }

//    @PostMapping("/deleteAccount")

}


