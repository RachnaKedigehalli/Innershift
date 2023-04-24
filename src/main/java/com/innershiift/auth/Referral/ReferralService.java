package com.innershiift.auth.Referral;

import com.innershiift.auth.user.doctor.Doctor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReferralService {

    private final ReferralRepository referralRepository;

    public Optional<Referral> getReferralByDoctor(Doctor d){
        List<Referral> rl =referralRepository.findAll();
        for(Referral r: rl){
            if(r.getDoctorId()== d.getDoctorId()){
                return Optional.of(r);
            }
        }
        return Optional.empty();
    }

    public Optional<Referral> getReferralByDoctorId(Integer dId){
        List<Referral> rl =referralRepository.findAll();
        for(Referral r: rl){
            if(r.getDoctorId()== dId){
                return Optional.of(r);
            }
        }
        return Optional.empty();
    }
    public Optional<Referral> generateReferralForDoctor(Doctor d,String s){
        List<Referral> rl = referralRepository.findAll();
        for(Referral r :rl){
            if(r.getDoctorId() == d.getDoctorId()){
                return Optional.of(r);
            }
        }
        Referral r = new Referral();
        r.setReferral(s);
        r.setDoctorId(d.getDoctorId());
        return Optional.of(referralRepository.save(r));

    }

    public Optional<Referral> generateReferralForDoctor(Doctor d){
        List<Referral> rl = referralRepository.findAll();
        for(Referral r :rl){
            if(r.getDoctorId() == d.getDoctorId()){
                return Optional.of(r);
            }
        }
        String s = "Ref:"+d.toString();
        if(s.length()>10){
            s=s.substring(0,9);
        }
        Referral r = new Referral();
        r.setReferral(s);
        r.setDoctorId(d.getDoctorId());
        return Optional.of(referralRepository.save(r));

    }

    public Optional<Integer> getDoctorByReferral(String s){
        List<Referral> rl = referralRepository.findAll();
        for(Referral r:rl){
            if(r.getReferral() == s || r.getReferral().equals(s)){
                return Optional.of(r.getDoctorId());
            }
        }
        return Optional.of(null);
    }
}

