package com.replate.backendreplate.Repository;

import com.replate.backendreplate.Model.FoodListing;
import com.replate.backendreplate.Model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodListingRepository extends JpaRepository<FoodListing, Long> {
    List<FoodListing> findByRestaurant (Restaurant restaurant);
}
