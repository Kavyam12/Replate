package com.replate.backendreplate.Repository;

import com.replate.backendreplate.Model.CartItem;
import com.replate.backendreplate.Model.FoodListing;
import com.replate.backendreplate.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByNgo (User ngo);

    Optional<CartItem> findByNgoAndFoodListing(User ngo, FoodListing foodListing);

    void deleteByNgo(User ngo);

    @Query("""
    SELECT c
    FROM CartItem c
    JOIN FETCH c.foodListing fl
    JOIN FETCH fl.restaurant
    WHERE c.ngo = :ngo
""")
    List<CartItem> findCartForCheckout(@Param("ngo") User ngo);

}
