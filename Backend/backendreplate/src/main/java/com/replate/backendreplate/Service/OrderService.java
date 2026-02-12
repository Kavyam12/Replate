package com.replate.backendreplate.Service;

import com.replate.backendreplate.Model.OrderStatus;
import com.replate.backendreplate.Model.Orders;
import com.replate.backendreplate.Model.Restaurant;
import com.replate.backendreplate.Model.User;
import com.replate.backendreplate.Repository.OrdersRepository;
import com.replate.backendreplate.Repository.RestaurantRepository;
import com.replate.backendreplate.Repository.UserRepository;
import com.replate.backendreplate.dto.CurrentOrderResponse;
import com.replate.backendreplate.dto.OrderHistoryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

        @Autowired
        private OrdersRepository ordersRepository;

        @Autowired
        private RestaurantRepository restaurantRepository;

        @Autowired
        private UserRepository userRepository;

        private Restaurant getLoggedInRestaurant() {

                Authentication auth = SecurityContextHolder.getContext().getAuthentication();
                User user = (User) auth.getPrincipal();

                return restaurantRepository.findByOwner(user)
                                .orElseThrow(() -> new RuntimeException("Restaurant not linked to logged-in user"));
        }

        public List<CurrentOrderResponse> getCurrentOrderListIn() {

                Restaurant restaurant = getLoggedInRestaurant();

                List<OrderStatus> currentStatuses = List.of(
                                OrderStatus.PENDING,
                                OrderStatus.READY_FOR_PICKUP,
                                OrderStatus.ACCEPTED);

                List<Orders> orders = ordersRepository.findByRestaurantIdAndStatusIn(
                                restaurant.getId(),
                                currentStatuses);

                return mapToResponse(orders);
        }

        public List<OrderHistoryResponse> getOrderHistory (){
            Restaurant restaurant = getLoggedInRestaurant();

            List<OrderStatus> Statuses = List.of(
                    OrderStatus.CANCELLED,
                    OrderStatus.COMPLETED
            );

            List<Orders> orders = ordersRepository.findByRestaurantIdAndStatusIn(
                    restaurant.getId(),
                    Statuses
            );

            return mapToHisResponse(orders);
        }

        private List<CurrentOrderResponse> mapToResponse(List<Orders> orders) {

                List<CurrentOrderResponse> response = new ArrayList<>();

                for (Orders order : orders) {
                        response.add(new CurrentOrderResponse(
                                        order.getId(),
                                        order.getFoodItemName(),
                                        order.getQuantity(),
                                        order.getQuantityUnit(),
                                        order.getNgoName(),
                                        order.getStatus(),
                                        order.getCreatedAt()));
                }

                return response;
        }

        private List<OrderHistoryResponse> mapToHisResponse(List<Orders> orders){

            List<OrderHistoryResponse> response = new ArrayList<>();

            for (Orders order : orders){
                response.add(new OrderHistoryResponse(
                        order.getId(),
                        order.getCreatedAt(),
                        order.getNgoName(),
                        order.getItemSummary(),
                        order.getTotalAmount(),
                        order.getStatus(),
                        order.getPaymentStatus(),
                        order.getPaymentMethod(),
                        order.getVolunteerName()));
            }

            return response;
        }
}
