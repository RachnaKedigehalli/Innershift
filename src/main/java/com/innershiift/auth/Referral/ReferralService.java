package com.innershiift.auth.Referral;

import com.innershiift.auth.user.doctor.Doctor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

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

    private String generateRandomString() {
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 6;
        Random random = new Random();

        return random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }
    public Optional<Referral> generateReferralForDoctor(Doctor d){
        List<Referral> rl = referralRepository.findAll();
        for(Referral r :rl){
            if(r.getDoctorId() == d.getDoctorId()){
                return Optional.of(r);
            }
        }
        String s = generateRandomString();
//        if(s.length()>10){
//            s=s.substring(0,9);
//        }
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

