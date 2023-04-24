package com.innershiift.auth.Referral;

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
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "_referral")
public class Referral {
    @Id
    @GeneratedValue
    private  Integer referralId;

    private Integer doctorId;

    private String referral;
}
