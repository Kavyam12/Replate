package com.replate.backendreplate.Repository;

import com.replate.backendreplate.Model.Responsibility;
import com.replate.backendreplate.Model.ResponsibilityStatus;
import com.replate.backendreplate.Model.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResponsibilityRepository extends JpaRepository<Responsibility, Long> {

    List<Responsibility> findByVolunteer(Volunteer volunteer);
    List<Responsibility> findByStatusAndVolunteerIsNull(ResponsibilityStatus status);
}
