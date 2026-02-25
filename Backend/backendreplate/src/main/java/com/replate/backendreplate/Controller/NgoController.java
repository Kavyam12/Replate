package com.replate.backendreplate.Controller;

import com.replate.backendreplate.Model.User;
import com.replate.backendreplate.Service.FoodListingService;
import com.replate.backendreplate.Service.NgoService;
import com.replate.backendreplate.dto.FoodListingResponse;
import com.replate.backendreplate.dto.NgoProfileRequest;
import com.replate.backendreplate.dto.NgoProfileResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ngo")
public class NgoController {

    @Autowired
    private NgoService ngoService;

    @Autowired
    private FoodListingService foodListingService;

    @GetMapping("/me")
    public NgoProfileResponse getProfile(Authentication authentication){
        User user = (User) authentication.getPrincipal();
        return ngoService.getNgoProfile(user);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateProfile(@RequestBody @Valid NgoProfileRequest ngoProfileRequest, Authentication authentication){
        User user = (User) authentication.getPrincipal();
        ngoService.updateNgoProfile(user, ngoProfileRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/available-food")
    public List<FoodListingResponse> getListings() {
        return foodListingService.getAvailableFoodForNgo();
    }
}
