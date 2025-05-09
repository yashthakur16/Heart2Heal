package com.organ.donation.controller;

import com.organ.donation.service.UserService;
import com.organ.donation.model.Role;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://127.0.0.1:5500") // Allow frontend origin
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Map<String, String> userData) {
        String response = userService.registerUser(
                userData.get("name"),
                userData.get("email"),
                userData.get("phone"),
                userData.get("password"),
                Role.valueOf(userData.get("role").toUpperCase())
        );

        if (response.equals("Email already exists!") || response.equals("Phone number already registered!")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> userData) {
        Map<String, String> response = userService.loginUser(userData.get("email"), userData.get("password"));
        return ResponseEntity.ok(response);
    }

}
