package com.replate.backendreplate.Controller;

import com.replate.backendreplate.Model.User;
import com.replate.backendreplate.Service.RestaurantService;
import com.replate.backendreplate.dto.CreateRestaurantRequest;
import com.replate.backendreplate.dto.RestaurantProfileResponse;
import com.replate.backendreplate.dto.RestaurantProfilerequest;
import com.replate.backendreplate.dto.RestaurantResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/donor")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @GetMapping("/me")
    public RestaurantProfileResponse getProfile(@AuthenticationPrincipal User user){
       return restaurantService.getProfile(user);

    }

//    @PutMapping("/me")
//    public ResponseEntity<?> updateProfile(@AuthenticationPrincipal User user, @RequestBody RestaurantProfilerequest request){
//        restaurantService.updateProfile(user, request);
//        return ResponseEntity.ok().build();
//    }

    @PutMapping("/me")
    public ResponseEntity<?> updateProfile(
            Authentication authentication,
            @Valid @RequestBody RestaurantProfilerequest request
    ) {
        User user = (User) authentication.getPrincipal();
        restaurantService.updateProfile(user, request);
        return ResponseEntity.ok().build();
    }
}
