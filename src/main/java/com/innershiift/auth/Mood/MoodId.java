package com.innershiift.auth.Mood;

import java.io.Serializable;
import java.util.Date;

//public class MoodId {
//}

public class MoodId implements Serializable {
    private Integer patientId;
    private Date date;
    // default constructor

    public MoodId(Integer patientId, Date date) {
        this.date = date;
        this.patientId = patientId;
    }

    // equals() and hashCode()
}