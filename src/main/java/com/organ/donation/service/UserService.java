package com.organ.donation.service;

import com.organ.donation.model.User;
import com.organ.donation.model.Role;
import com.organ.donation.repository.UserRepository;
import com.organ.donation.config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public String registerUser(String name, String email, String phone, String password, Role role) {
        if (userRepository.existsByEmail(email)) {
            return "Email already exists!";
        }
        if (userRepository.existsByPhone(phone)) {
            return "Phone number already registered!";
        }

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPhone(phone);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        userRepository.save(user);

        return "User registered successfully!";
    }

    public Map<String, String> loginUser(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            String token = jwtUtil.generateToken(email);
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("id", user.get().getId().toString()); // Include userId
            response.put("name", user.get().getName());
            response.put("role", user.get().getRole().toString());
            return response;
        }
        throw new RuntimeException("Invalid credentials!");
    }


}
