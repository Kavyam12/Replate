package com.replate.backendreplate.Controller;

import com.replate.backendreplate.Model.User;
import com.replate.backendreplate.Service.FoodListingService;
import com.replate.backendreplate.dto.FoodListingRequest;
import com.replate.backendreplate.dto.FoodListingResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/donor/food-listings")
public class FoodListingController {

    @Autowired
    private FoodListingService foodListingService;

    private User getLoggedInUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return (User) authentication.getPrincipal();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<FoodListingResponse> createFoodListing(
            @ModelAttribute FoodListingRequest request,
            @RequestPart(value = "imageFile", required = false)MultipartFile imageFile
            ){
        User user = getLoggedInUser();

        FoodListingResponse response = foodListingService.listFood(user, request, imageFile);

        return ResponseEntity.status(201).body(response);
    }

    @GetMapping
    public ResponseEntity<List<FoodListingResponse>> getFoodListing(){
        User user = getLoggedInUser();

        List<FoodListingResponse> response = foodListingService.getFoodListing(user);

        return ResponseEntity.ok(response);
    }


}
