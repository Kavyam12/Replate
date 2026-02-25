package com.replate.backendreplate.Repository;

import com.replate.backendreplate.Model.FoodListing;
import com.replate.backendreplate.Model.Restaurant;
import com.replate.backendreplate.Model.Status;
import com.replate.backendreplate.dto.DashboardRecentListingsResponse;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FoodListingRepository extends JpaRepository<FoodListing, Long> {
        List<FoodListing> findByRestaurant(Restaurant restaurant);

        @Query("""
                            SELECT COUNT(f)
                            FROM FoodListing f
                            WHERE f.restaurant = :restaurant
                                AND f.createdAt >= :start
                                AND f.createdAt < :end
                        """)
        long countFoodListedToday(
                        @Param("restaurant") Restaurant restaurant,
                        @Param("start") LocalDateTime start,
                        @Param("end") LocalDateTime end);

        @Query("""
                            SELECT new com.replate.backendreplate.dto.DashboardRecentListingsResponse(
                                f.foodName,
                                f.quantity,
                                f.price,
                                f.deadline,
                                f.status,
                                f.imageUrl
                            )
                            FROM FoodListing f
                            WHERE f.restaurant = :restaurant
                            ORDER BY f.createdAt DESC
                        """)
        List<DashboardRecentListingsResponse> findRecentListings(
                        @Param("restaurant") Restaurant restaurant,
                        Pageable pageable);

        List<FoodListing> findByStatus(Status status);

        @Lock(LockModeType.PESSIMISTIC_WRITE)
        @Query("SELECT f FROM FoodListing f WHERE f.id = :id")
        FoodListing findByIdForUpdate(@Param("id") Long id);

        List<FoodListing> findByIdIn(List<Long> ids);
}
