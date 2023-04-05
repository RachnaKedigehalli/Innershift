package com.innershiift.auth.Mood;


import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.time.DateUtils;
import org.hibernate.type.descriptor.DateTimeUtils;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
//@AllArgsConstructor
@Component
@RequiredArgsConstructor
public class MoodService {

    private final MoodRepository moodRepository;

    public List<Mood> getMoodByPatientId(Integer pid){
//        return  moodRepository.getMoodByPId(pid);
        List<Mood> lm = moodRepository.findAll();
        List<Mood> ret = new ArrayList<Mood>();
        for(Mood m: lm){
            if(m.getPatientId()== pid){
                ret.add(m);
            }
        }
        return ret;
    }

    public boolean isMoodSet(Integer pid) {
        List<Mood> lm = moodRepository.findAll();
        boolean isMoodSet = false;
        for(Mood m: lm){
            if(m.getPatientId() == pid){
                if(DateUtils.isSameDay(m.getDate(), new Date())) {
                    isMoodSet = true;
                    break;
                }
            }
        }
        return isMoodSet;
    }


    public List<Mood> getMoodByPidAndDate(Integer pid, Date date){
//        return moodRepository.getMoodByPIdAndDate(pid,date);
        List<Mood> lm = moodRepository.findAll();
        List<Mood> ret = new ArrayList<Mood>();
        for(Mood m: lm){
            if(m.getPatientId()==pid && m.getDate()==date){
                ret.add(m);
            }
        }
        return ret;

    }

    public Mood addMood(Integer pid, Date date, Integer mood) {
        Mood m = new Mood();
        m.setMood(mood);
        m.setDate(date);
        m.setPatientId(pid);
        return moodRepository.save(m);
    }
    public Mood addMood(Mood mood) {
        return moodRepository.save(mood);
    }
}
