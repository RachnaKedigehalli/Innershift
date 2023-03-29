package com.innershiift.auth.Mood;

import java.io.Serializable;
import java.util.Date;

//public class MoodId {
//}

class MoodId implements Serializable {
    private Integer patientId;
    private Date date;
    // default constructor

    public MoodId(Integer patientId, Date date) {
        this.date = date;
        this.patientId = patientId;
    }
    public  MoodId(){
        this.date=null;
        this.patientId = null;
    }

    // equals() and hashCode()
}