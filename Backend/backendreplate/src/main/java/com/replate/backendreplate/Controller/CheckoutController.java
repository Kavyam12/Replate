package com.replate.backendreplate.Controller;

import com.replate.backendreplate.Model.User;
import com.replate.backendreplate.Service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/checkout")
public class CheckoutController {

    @Autowired
    private CheckoutService checkoutService;

    @PostMapping("/place-order")
    public ResponseEntity<?> placeOrder (Authentication authentication) {

        User ngo = (User) authentication.getPrincipal();

        checkoutService.placeOrder(ngo);

        return ResponseEntity.ok("Order Placed Successfully");
    }
}
