package com.replate.backendreplate.Service;

import com.replate.backendreplate.Model.Restaurant;
import com.replate.backendreplate.Model.Role;
import com.replate.backendreplate.Model.User;
import com.replate.backendreplate.Repository.RestaurantRepository;
import com.replate.backendreplate.Repository.UserRepository;
import com.replate.backendreplate.dto.CreateRestaurantRequest;
import com.replate.backendreplate.dto.RestaurantProfileResponse;
import com.replate.backendreplate.dto.RestaurantProfilerequest;
import com.replate.backendreplate.dto.RestaurantResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${app.defaults.restaurant-image-url}")
    private String DEFAULT_IMAGE_URL;

    public RestaurantProfileResponse getProfile(User user){
        Restaurant restaurant = restaurantRepo.findByOwner(user).orElse(null);

        RestaurantProfileResponse restaurantResponse = new RestaurantProfileResponse();

        restaurantResponse.setOwnerName(user.getName());
        restaurantResponse.setOwnerEmail(user.getEmail());

        if (restaurant != null){
            restaurantResponse.setName(restaurant.getName());
            restaurantResponse.setAddress(restaurant.getAddress());
            restaurantResponse.setContactNumber(restaurant.getContactNumber());
            restaurantResponse.setImageUrl(
                    restaurant.getImageUrl() != null ? restaurant.getImageUrl() : DEFAULT_IMAGE_URL);
        } else {
                restaurantResponse.setImageUrl(DEFAULT_IMAGE_URL);
        }

        return restaurantResponse;
    }

    public void updateProfile(User user, RestaurantProfilerequest request){

        Restaurant restaurant = restaurantRepo.findByOwner(user).orElseGet(() -> {
            Restaurant res = new Restaurant();
            res.setOwner(user);
            res.setImageUrl(DEFAULT_IMAGE_URL);
            return res;
        });


        restaurant.setName(request.getName());
        restaurant.setAddress(request.getAddress());
        restaurant.setContactNumber(request.getContactNumber());

        restaurantRepo.save(restaurant);
    }


}


//
//
//package com.replate.backendreplate.Service;
//
//import com.replate.backendreplate.Model.FoodListing;
//import com.replate.backendreplate.Model.Restaurant;
//import com.replate.backendreplate.Model.Status;
//import com.replate.backendreplate.Model.User;
//import com.replate.backendreplate.Repository.FoodListingRepository;
//import com.replate.backendreplate.Repository.RestaurantRepository;
//import com.replate.backendreplate.dto.FoodListingRequest;
//import com.replate.backendreplate.dto.FoodListingResponse;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//public class FoodListingService {
//
//    @Autowired
//    private FoodListingRepository foodListingRepo;
//
//    @Autowired
//    private RestaurantRepository restaurantRepo;
//
//    /* ===================== CREATE ===================== */
//
//    public FoodListingResponse createFoodListing(User user, FoodListingRequest request) {
//
//        Restaurant restaurant = restaurantRepo.findByOwner(user)
//                .orElseThrow(() -> new RuntimeException("Restaurant not found for user"));
//
//        if (request.getQuantity() <= 0) {
//            throw new RuntimeException("Quantity must be greater than zero");
//        }
//
//        if (request.getDeadline().isBefore(LocalDateTime.now())) {
//            throw new RuntimeException("Deadline must be in the future");
//        }
//
//        FoodListing listing = new FoodListing();
//        listing.setFoodName(request.getFoodName());
//        listing.setQuantity(request.getQuantity());
//        listing.setPrice(request.getPrice());
//        listing.setDeadline(request.getDeadline());
//        listing.setRestaurant(restaurant);
//        listing.setStatus(Status.AVAILABLE);
//
//        FoodListing saved = foodListingRepo.save(listing);
//
//        return mapToResponse(saved);
//    }
//
//    /* ===================== GET ALL (MY LISTINGS) ===================== */
//
//    public List<FoodListingResponse> getMyFoodListings(User user) {
//
//        Restaurant restaurant = restaurantRepo.findByOwner(user)
//                .orElseThrow(() -> new RuntimeException("Restaurant not found for user"));
//
//        return foodListingRepo.findByRestaurant(restaurant)
//                .stream()
//                .map(this::mapToResponse)
//                .collect(Collectors.toList());
//    }
//
//    /* ===================== UPDATE ===================== */
//
//    public FoodListingResponse updateFoodListing(
//            User user,
//            Long foodListingId,
//            FoodListingRequest request
//    ) {
//
//        FoodListing listing = foodListingRepo.findById(foodListingId)
//                .orElseThrow(() -> new RuntimeException("Food listing not found"));
//
//        if (!listing.getRestaurant().getOwner().getId().equals(user.getId())) {
//            throw new RuntimeException("You are not allowed to update this food listing");
//        }
//
//        listing.setFoodName(request.getFoodName());
//        listing.setQuantity(request.getQuantity());
//        listing.setPrice(request.getPrice());
//        listing.setDeadline(request.getDeadline());
//
//        FoodListing updated = foodListingRepo.save(listing);
//
//        return mapToResponse(updated);
//    }
//
//    /* ===================== DELETE ===================== */
//
//    public void deleteFoodListing(User user, Long foodListingId) {
//
//        FoodListing listing = foodListingRepo.findById(foodListingId)
//                .orElseThrow(() -> new RuntimeException("Food listing not found"));
//
//        if (!listing.getRestaurant().getOwner().getId().equals(user.getId())) {
//            throw new RuntimeException("You are not allowed to delete this food listing");
//        }
//
//        foodListingRepo.delete(listing);
//    }
//
//    /* ===================== MAPPER ===================== */
//
//    private FoodListingResponse mapToResponse(FoodListing listing) {
//
//        FoodListingResponse response = new FoodListingResponse();
//        response.setFoodName(listing.getFoodName());
//        response.setQuantity(listing.getQuantity());
//        response.setPrice(listing.getPrice());
//        response.setDeadline(listing.getDeadline());
//        response.setStatus(listing.getStatus());
//
//        return response;
//    }

//

//package com.replate.backendreplate.Controller;
//
//import com.replate.backendreplate.Model.User;
//import com.replate.backendreplate.Service.FoodListingService;
//import com.replate.backendreplate.dto.FoodListingRequest;
//import com.replate.backendreplate.dto.FoodListingResponse;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.*;
//
//        import java.util.List;
//
//@RestController
//@RequestMapping("/restaurant/food")
//public class FoodListingController {
//
//    @Autowired
//    private FoodListingService foodListingService;
//
//    private User getLoggedInUser() {
//        Authentication authentication =
//                SecurityContextHolder.getContext().getAuthentication();
//        return (User) authentication.getPrincipal();
//    }
//
//    /* ===================== CREATE ===================== */
//
//    @PostMapping
//    public ResponseEntity<FoodListingResponse> createFoodListing(
//            @RequestBody FoodListingRequest request
//    ) {
//        User user = getLoggedInUser();
//        FoodListingResponse response =
//                foodListingService.createFoodListing(user, request);
//
//        return ResponseEntity.status(201).body(response);
//    }
//
//    /* ===================== GET ALL ===================== */
//
//    @GetMapping
//    public ResponseEntity<List<FoodListingResponse>> getMyFoodListings() {
//        User user = getLoggedInUser();
//        List<FoodListingResponse> responses =
//                foodListingService.getMyFoodListings(user);
//
//        return ResponseEntity.ok(responses);
//    }
//
//    /* ===================== UPDATE ===================== */
//
//    @PutMapping("/{id}")
//    public ResponseEntity<FoodListingResponse> updateFoodListing(
//            @PathVariable Long id,
//            @RequestBody FoodListingRequest request
//    ) {
//        User user = getLoggedInUser();
//        FoodListingResponse response =
//                foodListingService.updateFoodListing(user, id, request);
//
//        return ResponseEntity.ok(response);
//    }
//
//    /* ===================== DELETE ===================== */
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteFoodListing(@PathVariable Long id) {
//        User user = getLoggedInUser();
//        foodListingService.deleteFoodListing(user, id);
//
//        return ResponseEntity.noContent().build();
