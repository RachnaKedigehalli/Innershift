package com.innershiift.auth.Module;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "_moduleAssignment")
public class ModuleAssignment {

    @Id
    @GeneratedValue
    private Integer moduleAssignedId;
    private Integer patientId;
    private Boolean locked;
    private Integer moduleId;
    private String response;
    private Integer defaultFlag;
    private Integer status;//0 1 2
    private Date start_timestamp;
    private Date scheduled;
    // Modify duration datastructure from string to something that stores duration
    private String duration;


}