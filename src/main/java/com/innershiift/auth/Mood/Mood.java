package com.innershiift.auth.Mood;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "_mood")
@IdClass(MoodId.class)
public class Mood {
    @Id
    private Integer patientId;
    private Integer mood;
    @Id
    private Date date;


}
