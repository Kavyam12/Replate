package com.replate.backendreplate.Repository;

import com.replate.backendreplate.Model.Restaurant;
import com.replate.backendreplate.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    Optional<Restaurant> findByOwner(User owner);
}
