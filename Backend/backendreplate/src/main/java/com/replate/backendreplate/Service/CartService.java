package com.replate.backendreplate.Service;

import com.replate.backendreplate.Model.CartItem;
import com.replate.backendreplate.Model.FoodListing;
import com.replate.backendreplate.Model.User;
import com.replate.backendreplate.Repository.CartItemRepository;
import com.replate.backendreplate.Repository.FoodListingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private FoodListingRepository foodListingRepository;

    public void addToCart(User ngo, Long foodListingId, int qty){

        FoodListing listing = foodListingRepository.findById(foodListingId).orElseThrow(() -> new RuntimeException(("Listing Not Found")));

        CartItem item = cartItemRepository
                .findByNgoAndFoodListing(ngo, listing)
                .orElseGet(() -> {
                    CartItem c = new CartItem();
                    c.setNgo(ngo);
                    c.setFoodListing(listing);
                    c.setQuantity(0L);
                    return c;
                });

        item.setQuantity((item.getQuantity()+qty));
        cartItemRepository.save(item);
    }

    public List<CartItem> getCart (User ngo){
        return cartItemRepository.findByNgo(ngo);
    }

    public void removeCartItem (User ngo, Long foodListingId){
        FoodListing listing = foodListingRepository.findById(foodListingId).orElseThrow();

        CartItem item = cartItemRepository.findByNgoAndFoodListing(ngo, listing)
                .orElseThrow();

        cartItemRepository.delete(item);
    }

    public void clearCart (User ngo){
        cartItemRepository.deleteByNgo(ngo);
    }
}








