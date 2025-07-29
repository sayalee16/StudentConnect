package com.example.studentconnect.controller;

import com.example.studentconnect.factory.UserFactory;
import com.example.studentconnect.model.User;
import com.example.studentconnect.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.*;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository userRepository; 
    private final UserFactory userFactory;       
    private final HttpServletResponse response;

    @GetMapping("/oauth2/success")
    public void loginSuccess(@AuthenticationPrincipal OAuth2User user) throws IOException {
        String email = user.getAttribute("email");
        String name = user.getAttribute("name");

        Optional<User> existingUser = Optional.ofNullable(userRepository.findByEmail(email));

        if (existingUser.isPresent()) {
            
            response.sendRedirect("/studentHome");
        } else {
            
            response.sendRedirect("/register" + URLEncoder.encode(name, "UTF-8") + "&email=" + URLEncoder.encode(email, "UTF-8"));
        }
    }

    @GetMapping("/api/auth/userinfo")
    public ResponseEntity<?> getUserInfo(@AuthenticationPrincipal OAuth2User user) {
        if (user == null) return ResponseEntity.status(401).build();

        String email = user.getAttribute("email");
        Optional<User> optionalUser = Optional.ofNullable(userRepository.findByEmail(email));

        if (optionalUser.isPresent()) {
            User appUser = optionalUser.get();
            return ResponseEntity.ok(appUser);
        }

        return ResponseEntity.status(404).body("User not found");
    }
}

