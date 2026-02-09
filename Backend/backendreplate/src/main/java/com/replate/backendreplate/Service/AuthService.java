package com.replate.backendreplate.Service;

import com.replate.backendreplate.Config.SecurityConfig;
import com.replate.backendreplate.Model.User;
import com.replate.backendreplate.Repository.UserRepository;
import com.replate.backendreplate.Security.JwtUtil;
import com.replate.backendreplate.dto.LoginRequest;
import com.replate.backendreplate.dto.LoginResponse;
import com.replate.backendreplate.dto.RegisterRequest;
import com.replate.backendreplate.dto.UserResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public UserResponse register(@Valid RegisterRequest registerRequest) {

        if (userRepository.existsByEmail(registerRequest.getEmail())){
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRole(registerRequest.getRole());
        user.setContactNumber(registerRequest.getContactNumber());

        User savedUser = userRepository.save(user);

        UserResponse userResponse = new UserResponse();
        userResponse.setUserid(savedUser.getId());
        userResponse.setEmail(savedUser.getEmail());
        userResponse.setName(savedUser.getName());
        userResponse.setRole(savedUser.getRole());

        return userResponse;

    }

    public LoginResponse login(@Valid LoginRequest loginRequest){

        User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(() -> new RuntimeException("Email or password is incorrect"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())){
            throw new RuntimeException("Invalid Password");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        LoginResponse response = new LoginResponse();
        response.setUserId(user.getId());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());
        response.setToken(token);



        return response;

    }
}
