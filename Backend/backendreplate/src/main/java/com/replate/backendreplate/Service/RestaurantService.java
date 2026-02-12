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

