package com.innershiift.auth.diagnosis;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DiagnosisService {

    private final DiagnosisRepository diagnosisRepository;
    public Optional<Diagnosis> addDiagnosis(Integer cid, String diagnosis, Date date) {
        Diagnosis d = new Diagnosis();
        d.setDiagnosis(diagnosis);
        d.setConsultationId(cid);
        d.setDate(date);
        return Optional.of(diagnosisRepository.save(d));
    }

    public Optional<List<Diagnosis>> getAllDiagnosisByCid(Integer cid) {
        return Optional.of(diagnosisRepository.findAllByConsultationId(cid));
    }
}
