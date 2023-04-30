package com.innershiift.auth.Mood;


import com.innershiift.auth.notification.NotificationService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.time.DateUtils;
import org.hibernate.type.descriptor.DateTimeUtils;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
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
    private final NotificationService notificationService;

    public List<Mood> getMoodByPatientId(Integer pid){
//        return  moodRepository.getMoodByPId(pid);
        return moodRepository.findAllByPatientId(pid);
    }

    public boolean isMoodSet(Integer pid) {
        List<Mood> lm = moodRepository.findAllByPatientId(pid);
        SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMdd");
        for(Mood m: lm){
            if(fmt.format(m.getDate()).equals(fmt.format(new Date()))) {
                return true;
            }
        }
        return false;
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

    public List<Mood> getMoodByDate(Date date){
        List<Mood> lm = moodRepository.findAll();
        List<Mood> ret = new ArrayList<Mood>();
        SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMdd");
        for(Mood m: lm){
            if(fmt.format(m.getDate()).equals(fmt.format(date))){
                ret.add(m);
            }
        }
        return ret;
    }

//    public Mood addMood(Integer pid, Date date, Integer mood) {
//        Mood m = new Mood();
//        m.setMood(mood);
//        m.setDate(date);
//        m.setPatientId(pid);
//        try{
//            notificationService.sendPushNotification("ExponentPushToken[y0B36JFDW_Lk5UtrQMGqpT]", "Cute noti", "Hiiiiii");
//        }
//        catch (Exception e) {}
//        return moodRepository.save(m);
//    }
    public Mood addMood(Mood mood) {
        try{
            System.out.println("sendingggg");
            notificationService.sendNotificationToPatient(mood.getPatientId(), "Mood set", mood.getMood().toString());
//            notificationService.sendPushNotification("ExponentPushToken[y0B36JFDW_Lk5UtrQMGqpT]", "Cute noti", "Hiiiiii");
        }
        catch (Exception e) {
            System.out.println("catchinggggg");
        }
        return moodRepository.save(mood);
    }
}
