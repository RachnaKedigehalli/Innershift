package com.innershiift.auth.diagnosis;

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
@Table(name = "_diagnosis")
public class Diagnosis {
    @Id
    @GeneratedValue
    Integer diagnosisId;
    Integer consultationId;

    Date date;

    @Lob
    String diagnosis;

}
