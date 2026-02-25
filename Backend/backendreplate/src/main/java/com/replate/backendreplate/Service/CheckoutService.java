package com.replate.backendreplate.Service;

import com.replate.backendreplate.Model.*;
import com.replate.backendreplate.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CheckoutService {

    private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(CheckoutService.class);

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private FoodListingRepository foodListingRepository;

    @Autowired
    private CompleteOrderRepository completeOrderRepository;

    @Autowired
    private ResponsibilityRepository responsibilityRepository;

    @Autowired
    private OrdersRepository ordersRepository;

    @Transactional
    public void placeOrder(User ngo) {

        List<CartItem> cartItems = cartItemRepository.findCartForCheckout(ngo);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty order can't be placed");
        }

        for (CartItem cartItem : cartItems) {

            FoodListing foodListing = foodListingRepository.findByIdForUpdate(cartItem.getFoodListing().getId());

            if (foodListing.getStatus() != Status.AVAILABLE) {
                throw new RuntimeException("Food Listing no longer available");
            }

            if (foodListing.getQuantity() < cartItem.getQuantity()) {
                throw new RuntimeException("Insufficient quantity" + foodListing.getFoodName());
            }
        }

        Restaurant res = cartItems.get(0)
                .getFoodListing()
                .getRestaurant();

        CompleteOrder order = new CompleteOrder();
        order.setNgo(ngo);
        order.setRestaurant(res);
        order.setOrderStatus(OrderStatus.PENDING);

        BigDecimal total = BigDecimal.ZERO;

        for (CartItem cartItem : cartItems) {
            FoodListing listing = foodListingRepository.findByIdForUpdate(cartItem.getFoodListing().getId());

            Long newQty = listing.getQuantity() - cartItem.getQuantity();

            listing.setQuantity(newQty);

            if (newQty == 0) {
                listing.setStatus(Status.SOLD);
            }

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setFoodListing(listing);
            item.setQuantity(cartItem.getQuantity());
            item.setPrice(listing.getPrice());

            order.getItems().add(item);

            total = total.add(listing.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));

            // Added for backward compatibility with the old orders table used by restaurant
            // dashboard
            Orders legacyOrder = new Orders();
            legacyOrder.setFoodItemName(listing.getFoodName());
            legacyOrder.setQuantity(cartItem.getQuantity().intValue());
            legacyOrder.setQuantityUnit("Units"); // Default unit
            legacyOrder.setNgoName(ngo.getName());
            legacyOrder.setRestaurantId(res.getId());
            legacyOrder.setRestaurantName(res.getName());
            legacyOrder.setItemSummary(listing.getFoodName()); // Use food name as summary
            legacyOrder.setTotalAmount(
                    listing.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())).doubleValue());
            legacyOrder.setStatus(OrderStatus.PENDING);
            legacyOrder.setPaymentMethod(PaymentMethod.CASH); // Default
            legacyOrder.setPaymentStatus(PaymentStatus.UNPAID);
            legacyOrder.setCreatedAt(LocalDateTime.now());
            ordersRepository.save(legacyOrder);

        }

        order.setTotalAmount(total);
        completeOrderRepository.save(order);
        createResponsibility(order);
        cartItemRepository.deleteByNgo(ngo);
    }

    @Transactional
    public Responsibility createResponsibility(CompleteOrder completeOrder) {
        Responsibility responsibility = new Responsibility();

        responsibility.setOrder(completeOrder);
        responsibility.setRestaurant(completeOrder.getRestaurant());
        responsibility.setNgo(completeOrder.getNgo());
        responsibility.setCreatedAt(LocalDateTime.now());
        responsibility.setStatus(ResponsibilityStatus.OPEN);

        Responsibility saved = responsibilityRepository.save(responsibility);
        logger.info("CREATED RESPONSIBILITY: ID={}, NGO={}, Restaurant={}, Status={}",
                saved.getId(), saved.getNgo().getEmail(), saved.getRestaurant().getName(), saved.getStatus());

        return saved;

    }
}
