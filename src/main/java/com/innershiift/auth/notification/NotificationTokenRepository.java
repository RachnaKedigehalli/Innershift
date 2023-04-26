package com.innershiift.auth.notification;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationTokenRepository extends JpaRepository<NotificationToken, Integer> {
    boolean existsByPatientId(Integer patientId);
    boolean existsByToken(String token);
    NotificationToken findByPatientId(Integer patientId);
    NotificationToken findByToken(String token);
    void deleteDistinctByPatientIdAndToken(Integer patientId, String token);
    List<NotificationToken> findAllByPatientId(Integer patientId);
}
