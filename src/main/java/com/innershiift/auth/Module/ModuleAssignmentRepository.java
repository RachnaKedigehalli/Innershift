package com.innershiift.auth.Module;


import com.innershiift.auth.consultation.Consultation;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ModuleAssignmentRepository extends JpaRepository<ModuleAssignment, Integer> {
    @Transactional
    Optional<List<ModuleAssignment>> getModuleAssignmentByPatientIdOrderByScheduled_timestamp(Integer pid);

    @Modifying
    @Query("UPDATE ModuleAssignment m SET m.scheduled_timestamp= ?2 WHERE m.moduleAssignedId = ?1")
    void updateOrderByModuleAssignedId(Integer mid, Date sd);
}