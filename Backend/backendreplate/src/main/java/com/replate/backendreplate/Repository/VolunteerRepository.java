package com.replate.backendreplate.Repository;

import com.replate.backendreplate.Model.User;
import com.replate.backendreplate.Model.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VolunteerRepository extends JpaRepository<Volunteer, Long> {

    Optional<Volunteer> findByVolunteerOwner(User volunteerOwner);
//    Optional<Volunteer> findByUser(User user);
}
