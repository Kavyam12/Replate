package com.replate.backendreplate.Service;

import com.replate.backendreplate.Model.FoodListing;
import com.replate.backendreplate.Model.Restaurant;
import com.replate.backendreplate.Model.Status;
import com.replate.backendreplate.Model.User;
import com.replate.backendreplate.Repository.FoodListingRepository;
import com.replate.backendreplate.Repository.RestaurantRepository;
import com.replate.backendreplate.dto.FoodListingRequest;
import com.replate.backendreplate.dto.FoodListingResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FoodListingService {

    @Autowired
    private FoodListingRepository foodListingRepo;

    @Autowired
    private RestaurantRepository restaurantRepo;

    @Autowired
    private ImageStorageService imageStorageService;

    public FoodListingResponse listFood(User user, FoodListingRequest foodListingRequest, MultipartFile imageFile){

        Restaurant restaurant = restaurantRepo.findByOwner(user).orElseThrow( () -> new RuntimeException(("Restaurant not found for the given user"))   );

        if(foodListingRequest.getQuantity() <= 0){
            throw new IllegalArgumentException("Quantity can't be less than 0");
        }

        if(foodListingRequest.getDeadline().isBefore(LocalDateTime.now())){
            throw new RuntimeException("Deadline must be in future");
        }

        FoodListing foodListing = new FoodListing();
        foodListing.setFoodName((foodListingRequest.getFoodName()));
        foodListing.setQuantity(foodListingRequest.getQuantity());
        foodListing.setPrice(foodListingRequest.getPrice());
        foodListing.setDeadline(foodListingRequest.getDeadline());
        foodListing.setStatus(Status.AVAILABLE);
        foodListing.setRestaurant(restaurant);


        if(imageFile != null && !imageFile.isEmpty()){
            String imageUrl = imageStorageService.store(imageFile);
            foodListing.setImageUrl(imageUrl);
        }

        FoodListing saved = foodListingRepo.save(foodListing);

        return mapToResponse(saved);

    }

    public List<FoodListingResponse> getFoodListing(User user){

        Restaurant restaurant = restaurantRepo.findByOwner(user).orElseThrow(() -> new RuntimeException("Restaurant not found for the given user"));

        return foodListingRepo.findByRestaurant(restaurant)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private FoodListingResponse mapToResponse (FoodListing listing){

        FoodListingResponse response = new FoodListingResponse();
        response.setFoodName(listing.getFoodName());
        response.setQuantity(listing.getQuantity());
        response.setPrice(listing.getPrice());
        response.setDeadline(listing.getDeadline());
        response.setStatus(listing.getStatus());
        response.setImage(listing.getImageUrl());

        return response;
    }
}
