package com.innershiift.auth.consultation;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ConsultationService {

    private final ConsultationRepository consultationRepository;
    private final MessageRepository messageRepository;

    public Optional<List<Consultation>> getAllConsultationPerUser(Integer userId){
        List<Consultation> temp=consultationRepository.findAll();
        List<Consultation> ret=new ArrayList<Consultation>();
        for(Consultation c: temp){
            if(c.getDoctorId()==userId || c.getPatientId()==userId){
                ret.add(c);
            }
        }
        return Optional.of(ret);
    }
    public Optional<List<Message>> getAllMessageForConsultationId(Integer cId){
        Optional<Consultation> c=consultationRepository.findById(cId);
        List<Message> ret = new ArrayList<Message>();
        if(c.isPresent()){
            for(Integer mId: c.get().getMessageIdHistory()){
                Optional<Message> m=messageRepository.findById(mId);
                if(m.isPresent())ret.add(m.get());
            }
            return Optional.of(ret);
        }
        return  Optional.of(ret);

    }
    public Optional<Consultation> addConsultationBetweenUserId(Integer id1,Integer id2){
        Consultation c = new Consultation();
        c.setPatientId(id2);
        c.setDoctorId(id1);
        c.setStatus(true);
        return Optional.of(consultationRepository.save(c));
    }
    public Optional<Message> addMessageToConsultation(Integer cid,String message){
        Message m = new Message();
        m.setConsultationId(cid);
        m.setContent(message);
        m.setTimeStamp(new Date());
        m.setReadRecipt(false);
        Message ret = messageRepository.save(m);
        Optional<Consultation> c = consultationRepository.findById(cid);
        if(c.isPresent()){
            Consultation consultation = c.get();
            List<Integer> messageIdHistory = consultation.getMessageIdHistory();
            messageIdHistory.add(ret.getMessageId());
            consultation.setMessageIdHistory(messageIdHistory);
            return Optional.of(ret);
        }
        else return Optional.of(null);
    }
}
