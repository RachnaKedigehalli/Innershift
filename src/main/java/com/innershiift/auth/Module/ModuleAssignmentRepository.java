package com.innershiift.auth.Module;


import com.innershiift.auth.consultation.Consultation;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ModuleAssignmentRepository extends JpaRepository<ModuleAssignment, Integer> {
    @Transactional
    Optional<List<ModuleAssignment>> getModuleAssignmentByPatientId(Integer pid);
}