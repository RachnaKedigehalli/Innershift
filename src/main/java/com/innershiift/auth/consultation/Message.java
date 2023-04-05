package com.innershiift.auth.consultation;


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
@Table(name = "_message")
public class Message {

    @Id
    @GeneratedValue
    private Integer messageId;

    private Integer consultationId;
    private Integer senderId;

    private Integer recipientId;
    private String content;
    private Date timeStamp;
    private Boolean readReceipt;

}
