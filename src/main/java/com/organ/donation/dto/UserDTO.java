package com.organ.donation.dto;

import com.organ.donation.model.Role;

public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private Role role; // Only include necessary fields

    public UserDTO(Long id, String name, String email, Role role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public Role getRole() { return role; }
}
