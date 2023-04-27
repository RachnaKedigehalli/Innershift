package com.innershiift.auth.Module;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ModuleStatus {
    private Integer id;
    private Boolean locked;
}