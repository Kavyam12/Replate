package com.replate.backendreplate.Controller;

import com.replate.backendreplate.Service.AuthService;
import com.replate.backendreplate.dto.LoginRequest;
import com.replate.backendreplate.dto.LoginResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class LoginController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest,
                                               HttpServletResponse httpResponse){

        LoginResponse loginResponse = authService.login(loginRequest);

        Cookie cookie = new Cookie("auth_token", loginResponse.getToken());
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(7*24*60*60);

        httpResponse.addCookie(cookie);

        loginResponse.setToken(null);

        return ResponseEntity.ok(loginResponse);


    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {

        if (authentication == null) {
            return ResponseEntity.status(HttpServletResponse.SC_UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(authentication.getPrincipal());
    }
}
