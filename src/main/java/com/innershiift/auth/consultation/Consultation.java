package com.innershiift.auth.consultation;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Integer consultationId;

    private Integer patientId;
    private Integer doctorId;
    private Boolean status;
    @ElementCollection
    private List<Integer> messageIdHistory;
}
