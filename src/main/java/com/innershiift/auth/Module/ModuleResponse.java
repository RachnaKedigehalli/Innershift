package com.innershiift.auth.Module;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ModuleResponse {
    private Module module;
    private ModuleAssignment moduleAssignment;
}
