package com.innershiift.auth.consultation;


import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ConsultationService {

    private final ConsultationRepository consultationRepository;
    private final MessageRepository messageRepository;

    public Optional<List<Consultation>> getAllConsultationPerUser(int userId){
        List<Consultation> temp=consultationRepository.findAll();
        List<Consultation> ret=new ArrayList<Consultation>();
        for(Consultation c: temp){
            if(c.getDoctorId() == userId || c.getPatientId() == userId){
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
                m.ifPresent(ret::add);
            }
            return Optional.of(ret);
        }
        return  Optional.of(ret);

    }
    public Optional<Consultation> addConsultationBetweenUserId(Integer id1,Integer id2){
        Consultation c = new Consultation();
        c.setPatientId(id2);
        c.setDoctorId(id1);
        c.setStatus(false);
        return Optional.of(consultationRepository.save(c));
    }
    public Optional<Consultation> setConsultationStatus(Integer cid,Boolean status){
        Optional<Consultation> c = consultationRepository.findById(cid);
        if(c.isPresent()){
            c.get().setStatus(status);
            return Optional.of(consultationRepository.save(c.get()));
        }
        return  Optional.of(null);
    }
    @Transactional
    public Optional<Message> addMessageToConsultation(Integer cid,String message, Integer senderId, Integer recipientId){
        Message m = new Message();
        m.setConsultationId(cid);
        m.setContent(message);
        m.setTimeStamp(new Date());
        m.setReadReceipt(false);
        m.setSenderId(senderId);
        m.setRecipientId(recipientId);
        Message ret = messageRepository.save(m);
        Optional<Consultation> c = consultationRepository.findById(cid);
        if(c.isPresent()){
            Consultation consultation = c.get();
            List<Integer> messageIdHistory = consultation.getMessageIdHistory();
            messageIdHistory.add(ret.getMessageId());
            consultation.setMessageIdHistory(messageIdHistory);
            consultationRepository.save(consultation);
            return Optional.of(ret);
        }
        else return Optional.of(new Message());
    }

    public List<Message> getAllMessagesByPid(Integer pid){
        List<Message> ret = new ArrayList<Message>();
        List<Consultation> cl = consultationRepository.findAll();
        for(Consultation c : cl){
            if(Objects.equals(c.getPatientId(), pid) || Objects.equals(c.getDoctorId(), pid)){
                Optional<List<Message>> temp = getAllMessageForConsultationId(c.getConsultationId());
                if(temp.isPresent()){
                    for(Message m: temp.get()){
                        ret.add(m);
                    }
                }
            }
        }
        return ret;

    }

//    public  List<Message> getAllMessagesByCId(Integer cid){}
}
