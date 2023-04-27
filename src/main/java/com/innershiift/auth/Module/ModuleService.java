package com.innershiift.auth.Module;


import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ModuleService {
    private final ModuleRepository moduleRepository;
    private final ModuleAssignmentRepository moduleAssignmentRepository;

    public Module addModule(Module m){
        return  moduleRepository.save(m);
    }

    public Optional<Module> addModule(String content){
        Module m = new Module();
        m.setContent(content);
        return Optional.of(moduleRepository.save(m));
    }

    public void deleteModule(Integer moduleId){
        // should update the moduleAssignment table also
        moduleRepository.deleteById(moduleId);
    }

    public Optional<ModuleAssignment> assignModule(Integer pId, Integer mId, Date sd){
        String response = "";
        ModuleAssignment moduleAssignment = new ModuleAssignment();
        moduleAssignment.setModuleId(mId);
        moduleAssignment.setPatientId(pId);
        moduleAssignment.setScheduled(sd);
        moduleAssignment.setLocked(false);
//        moduleAssignment.setDuration(duration);
//        moduleAssignment.setStart_timestamp(start);
        moduleAssignment.setStatus(0);
        return Optional.of(moduleAssignmentRepository.save(moduleAssignment));
    }
    @Transactional
    public Optional<ModuleAssignment> setModuleLocked(Integer assignmentId,Boolean locked){
        Optional<ModuleAssignment> ma = moduleAssignmentRepository.findById(assignmentId);
        System.out.println("In the module service");
        if(ma.isPresent()){
            System.out.println("Setting Locked ");
            moduleAssignmentRepository.setLockedStatus(assignmentId, locked);
            System.out.println("Locked set!");
            return moduleAssignmentRepository.findById(assignmentId);
        }
        return ma;
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
    public Optional<List<ModuleResponse>> getModulesByPid(Integer pid) {
        Optional<List<ModuleAssignment>> moduleAssignments = moduleAssignmentRepository.getModuleAssignmentByPatientIdOrderByScheduled(pid);
        List<ModuleResponse> ret = new ArrayList<>();
        moduleAssignments.ifPresent((mAs)->{
            for(ModuleAssignment mA: mAs) {
                ModuleResponse mr = new ModuleResponse();
                Optional<Module> m = moduleRepository.getModuleByModuleId(mA.getModuleId());
                m.ifPresent(mr::setModule);
                mr.setModuleAssignment(mA);
                ret.add(mr);
            }
        });
        return Optional.of(ret);
    }

    public Optional<List<Module>> getAllModules() {
        return Optional.of(moduleRepository.findAll());
    }
    @Transactional
    public void updateOrderByModuleAssignedId(Integer mid, Date sd) {
        moduleAssignmentRepository.updateOrderByModuleAssignedId(mid, sd);
    }

    public Optional<ModuleAssignment> deleteAssignmentById(Integer maId) {
        Optional<ModuleAssignment> ma = moduleAssignmentRepository.findById(maId);
        if(ma.isPresent()){
            moduleAssignmentRepository.deleteById(maId);
            return ma;
        }
        return ma;
    }

}
