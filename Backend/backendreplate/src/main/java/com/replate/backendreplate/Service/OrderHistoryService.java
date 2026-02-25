package com.replate.backendreplate.Service;

import com.replate.backendreplate.Model.CompleteOrder;
import com.replate.backendreplate.Model.Ngo;
import com.replate.backendreplate.Model.OrderItem;
import com.replate.backendreplate.Model.User;
import com.replate.backendreplate.Repository.CompleteOrderRepository;
import com.replate.backendreplate.Repository.UserRepository;
import com.replate.backendreplate.dto.NgoOrderHistoryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderHistoryService {

    @Autowired
    private CompleteOrderRepository completeOrderRepository;

    @Autowired
    private UserRepository userRepository;

    public List<NgoOrderHistoryResponse> getOrderHistory(String email){

        User ngo = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        List<CompleteOrder> orders = completeOrderRepository.findByNgoOrderByCreatedAtDesc(ngo);

        return orders.stream().map(this::mapToDto).toList();
    }

    private NgoOrderHistoryResponse mapToDto(CompleteOrder order) {

        NgoOrderHistoryResponse dto = new NgoOrderHistoryResponse();

        dto.setId(order.getId());
        dto.setRestaurantName(order.getRestaurant().getName());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setOrderStatus(order.getOrderStatus());
        dto.setCreatedAt(order.getCreatedAt());

        List<NgoOrderHistoryResponse.Item> items =
                order.getItems().stream().map(item -> {

                    NgoOrderHistoryResponse.Item i = new NgoOrderHistoryResponse.Item();
                    i.setFoodName(item.getFoodListing().getFoodName());
                    i.setQuantity(item.getQuantity());
                    i.setPrice(item.getPrice());

                    return i;

                }).toList();

        dto.setItems(items);

        return dto;
    }
}
