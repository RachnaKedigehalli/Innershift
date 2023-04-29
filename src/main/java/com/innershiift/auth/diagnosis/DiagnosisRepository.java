package com.innershiift.auth.diagnosis;

import com.innershiift.auth.consultation.Message;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiagnosisRepository  extends JpaRepository<Diagnosis, Integer> {
    @Transactional
    public List<Diagnosis> findAllByConsultationId(Integer cid);
}
