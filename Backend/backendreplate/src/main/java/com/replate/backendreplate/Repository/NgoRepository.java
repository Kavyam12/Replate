package com.replate.backendreplate.Repository;

import com.replate.backendreplate.Model.Ngo;
import com.replate.backendreplate.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.Optional;

@Repository
public interface NgoRepository extends JpaRepository<Ngo, Long> {
    Optional<Ngo> findByNgoOwner(User user);
}
