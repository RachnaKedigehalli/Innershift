package com.innershiift.auth.consultation;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "_consultation")
public class Consultation {
    @Id
    @GeneratedValue
    private Integer consultationId;

    private Integer patientId;
    private Integer doctorId;
    private Boolean status;
    private List<Integer> messageIdHistory;
}
