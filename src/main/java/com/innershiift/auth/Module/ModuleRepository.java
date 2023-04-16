package com.innershiift.auth.Module;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ModuleRepository extends JpaRepository<Module, Integer> {
    @Transactional
    Optional<Module> getModuleByModuleId(Integer mid);
}