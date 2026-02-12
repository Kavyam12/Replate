package com.replate.backendreplate.Security;

import com.replate.backendreplate.Model.User;
import com.replate.backendreplate.Repository.UserRepository;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        return path.equals("/auth/login")
                || path.equals("/auth/register")
                || path.startsWith("/uploads/")
                || path.startsWith("/h2-console/")
                || HttpMethod.OPTIONS.matches(request.getMethod());
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String token = null;

        if (request.getCookies() != null){
            for (var cookie: request.getCookies()){
                if ("auth_token".equals(cookie.getName())){
                    token = cookie.getValue();
                }
            }
        }

//        String authHeader = request.getHeader("Authorization");
//
//        if (authHeader != null && authHeader.startsWith("Bearer ")) {
//            String token = authHeader.substring(7);
//
//            try {
//                String email = jwtUtil.extractEmail(token);
//
//                User user = userRepository.findByEmail(email).orElse(null);
//
//                if (user != null &&
//                        SecurityContextHolder.getContext().getAuthentication() == null) {
//
//                    UsernamePasswordAuthenticationToken authToken =
//                            new UsernamePasswordAuthenticationToken(
//                                    user, // principal
//                                    null,
//                                    List.of(() -> "ROLE_" + user.getRole().name())
//                            );
//
//                    SecurityContextHolder.getContext().setAuthentication(authToken);
//                }
//
//            } catch (JwtException e) {
//                // Invalid / expired / tampered JWT
//                SecurityContextHolder.clearContext();
//                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//                return;
//            }
//        }
//
//        filterChain.doFilter(request, response);

        if (token != null)
        {
            try {
                String email = jwtUtil.extractEmail(token);

                User user = userRepository.findByEmail(email).orElse(null);

                if (user != null && SecurityContextHolder.getContext().getAuthentication() == null){
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(user, null, List.of(() -> "ROLE_" + user.getRole().name()));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            } catch (JwtException e){
                SecurityContextHolder.clearContext();
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}