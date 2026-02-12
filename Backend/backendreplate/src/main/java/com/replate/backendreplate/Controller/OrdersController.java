package com.replate.backendreplate.Controller;

import com.replate.backendreplate.Service.OrderService;
import com.replate.backendreplate.dto.CurrentOrderResponse;
import com.replate.backendreplate.dto.OrderHistoryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/donor/orders")
public class OrdersController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/current")
    @PreAuthorize("hasRole('RESTAURANT')")
    public List<CurrentOrderResponse> getCurrentOrders(){
        return orderService.getCurrentOrderListIn();
    }

    @GetMapping("/history")
    @PreAuthorize("hasRole('RESTAURANT')")
    public List<OrderHistoryResponse> getOrderHistory(){
        return orderService.getOrderHistory();
    }
}
