package com.organ.donation.controller;

import com.organ.donation.dto.UserDTO;
import com.organ.donation.model.User;
import com.organ.donation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/all")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<User> users = userRepository.findAll();

        List<UserDTO> userDTOs = users.stream()
            .map(user -> new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getRole()))
            .collect(Collectors.toList());

        return ResponseEntity.ok(userDTOs);
    }
}
