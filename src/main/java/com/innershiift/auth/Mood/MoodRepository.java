package com.innershiift.auth.Mood;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Date;
import java.util.List;

//@Repository
public interface MoodRepository extends JpaRepository<Mood,Integer> {
    List<Mood> findAllByPatientId(Integer p);
}
