package com.smartexpense.backend.service;

import com.smartexpense.backend.dto.LoginRequest;
import com.smartexpense.backend.dto.RegisterRequest;
import com.smartexpense.backend.entity.User;
import com.smartexpense.backend.security.JwtUtil;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthService(UserService userService,
                       JwtUtil jwtUtil) {

        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    public String register(RegisterRequest request) {

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(request.getPassword())
                .build();

        userService.register(user);

        return "Registration Successful";
    }

    public String login(LoginRequest request) {

        User user = userService
                .login(request.getEmail(), request.getPassword())
                .orElseThrow(() ->
                        new RuntimeException("Invalid Email or Password"));

        return jwtUtil.generateToken(user.getEmail());
    }
}
