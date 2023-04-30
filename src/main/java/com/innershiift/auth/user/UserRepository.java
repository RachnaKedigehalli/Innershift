package com.innershiift.auth.user;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.role= ?2 WHERE u.id = ?1")
    int updateRole(Integer uid, Role r);

    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.password= ?2 WHERE u.email = ?1")
    int updatePasswordByEmail(String email, String password);

    @Modifying
    @Transactional
    void deleteUserByEmail(String email);
}
