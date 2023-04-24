package com.innershiift.auth.Referral;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ReferralRequest {
    private  Integer referralId;

    private Integer doctorId;
    private Integer patientId;

    private String referral;
}
