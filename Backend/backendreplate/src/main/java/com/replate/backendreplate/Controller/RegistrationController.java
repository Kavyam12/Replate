package com.replate.backendreplate.Controller;

import com.replate.backendreplate.Service.AuthService;
import com.replate.backendreplate.dto.RegisterRequest;
import com.replate.backendreplate.dto.UserResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class RegistrationController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public UserResponse registration (@Valid @RequestBody RegisterRequest registerRequest){
        return authService.register(registerRequest);
    }
}
