package com.innershiift.auth.Module;

import jakarta.persistence.*;
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
@Table(name = "_module")
public class Module {

    @Id
    @GeneratedValue
    private Integer moduleId;

    @Lob
    private String content;

}