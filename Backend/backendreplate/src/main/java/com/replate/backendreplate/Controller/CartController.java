package com.replate.backendreplate.Controller;

import com.replate.backendreplate.Model.CartItem;
import com.replate.backendreplate.Model.User;
import com.replate.backendreplate.Service.CartService;
import com.replate.backendreplate.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;


    @PostMapping("/add")
    public void addToCart(@RequestParam Long listingId,
                              @RequestParam int qty,
                              Authentication authentication)
    {



        User ngo = (User) authentication.getPrincipal();
        cartService.addToCart(ngo, listingId, qty);
    }

    @GetMapping("/cart-items")
    public List<CartItem> getCart( Authentication authentication) {

        User ngo = (User) authentication.getPrincipal();
        return cartService.getCart(ngo);
    }


    @DeleteMapping("/remove")
    public void removeItem(@RequestParam Long listingId,
                               Authentication authentication) {

        User ngo = (User) authentication.getPrincipal();
        cartService.removeCartItem(ngo, listingId);
    }


    @DeleteMapping("/clear")
    public void clearCart(Authentication authentication) {

        User ngo = (User) authentication.getPrincipal();
        cartService.clearCart(ngo);
    }
}

