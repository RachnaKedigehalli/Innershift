package com.innershiift.auth.Module;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ModuleService {
    private final ModuleRepository moduleRepository;
    private final ModuleAssignmentRepository moduleAssignmentRepository;

    public Module addModule(Module m){
        return  moduleRepository.save(m);
    }

    public Module addModule(String content){
        Module m = new Module();
        m.setContent(content);
        return moduleRepository.save(m);
    }

    public void deleteModule(Integer moduleId){
        // should update the moduleAssignment table also
        moduleRepository.deleteById(moduleId);
    }

    public ModuleAssignment assignModule(Integer pId, Integer mId, Date start, String duration, Integer status){
        String response = "";
        ModuleAssignment moduleAssignment = new ModuleAssignment();
        moduleAssignment.setModuleId(mId);
        moduleAssignment.setPatientId(pId);
        moduleAssignment.setDuration(duration);
        moduleAssignment.setStart_timestamp(start);
        moduleAssignment.setStatus(status);
        return moduleAssignmentRepository.save(moduleAssignment);
    }

    public Optional<ModuleAssignment> setModuleStatus(Integer assignmentId,Integer status){
        Optional<ModuleAssignment> moduleAssignment = moduleAssignmentRepository.findById(assignmentId);
        if(moduleAssignment.isPresent()){
            ModuleAssignment m = moduleAssignment.get();
            m.setStatus(status);
            moduleAssignmentRepository.save(m);
            return moduleAssignmentRepository.findById(assignmentId);
        }
        return moduleAssignment;
    }

    public Optional<ModuleAssignment> setModuleResponses(Integer assignmentId, String moduleResponses){
        Optional<ModuleAssignment> moduleAssignment = moduleAssignmentRepository.findById(assignmentId);
        if(moduleAssignment.isPresent()){
            ModuleAssignment m = moduleAssignment.get();
            m.setResponse(moduleResponses);
            moduleAssignmentRepository.save(m);
            return moduleAssignmentRepository.findById(assignmentId);
        }
        return moduleAssignment;

    }

}
