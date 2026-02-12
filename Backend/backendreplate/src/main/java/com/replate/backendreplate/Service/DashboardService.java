package com.replate.backendreplate.Service;

import com.replate.backendreplate.Model.OrderStatus;
import com.replate.backendreplate.Model.PaymentStatus;
import com.replate.backendreplate.Model.Restaurant;
import com.replate.backendreplate.Model.User;
import com.replate.backendreplate.Repository.FoodListingRepository;
import com.replate.backendreplate.Repository.OrdersRepository;
import com.replate.backendreplate.Repository.RestaurantRepository;
import com.replate.backendreplate.dto.DashboardRecentListingsResponse;
import com.replate.backendreplate.dto.DashboardSummaryResponse;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

import java.util.List;

@Service
public class DashboardService {

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private FoodListingRepository foodListingRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    private Restaurant getLoggedInRestaurant() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        return restaurantRepository.findByOwner(user)
                .orElseThrow(() -> new RuntimeException("Restaurant not linked to logged-in user"));
    }

    public DashboardSummaryResponse getDashboardSummary(){

        Restaurant restaurant  = getLoggedInRestaurant();

        //Orders Completed
        Long ordersCompleted = ordersRepository.countByRestaurantIdAndStatus(restaurant.getId(), OrderStatus.COMPLETED);

        // Food Listed Today

        LocalDate today = LocalDate.now();
        LocalDateTime start = today.atStartOfDay();
        LocalDateTime end  = today.plusDays(1).atStartOfDay();

        long foodListedToday = foodListingRepository.countFoodListedToday(restaurant, start, end);

        // Revenue generated

        Double revenueGenerated = ordersRepository.calculateRevenue(restaurant.getId(), PaymentStatus.PAID);

        //Pending pickups

        List<OrderStatus> statuses = List.of(
                OrderStatus.PENDING,
                OrderStatus.ACCEPTED,
                OrderStatus.READY_FOR_PICKUP
        );
        Long pendingPickups = ordersRepository.countPendingPickups(restaurant.getId(), statuses);

        return new DashboardSummaryResponse(
                foodListedToday,
                ordersCompleted,
                revenueGenerated,
                pendingPickups
        );


    }

    public List<DashboardRecentListingsResponse> getRecentListings(){

        Restaurant restaurant = getLoggedInRestaurant();

        Pageable pageable = PageRequest.of(0,5);
        return foodListingRepository.findRecentListings(restaurant, pageable);
    }
}
