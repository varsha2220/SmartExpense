package com.smartexpense.backend.repository;

import com.smartexpense.backend.entity.User;
import com.smartexpense.backend.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    Optional<UserProfile> findByUser(User user);

    Optional<UserProfile> findByEmail(String email);

    boolean existsByEmail(String email);

}
