package com.replate.backendreplate.Controller;

import com.replate.backendreplate.Model.User;
import com.replate.backendreplate.Service.OrderHistoryService;
import com.replate.backendreplate.dto.NgoOrderHistoryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/ngo")
public class OrderHistoryController {

    @Autowired
    private OrderHistoryService orderHistoryService;

    @GetMapping("/my-orders")
    public List<NgoOrderHistoryResponse> getMyOrders(Authentication authentication) {

        User ngo = (User) authentication.getPrincipal();
        String email = ngo.getEmail();
        return orderHistoryService.getOrderHistory(email);
    }
}
