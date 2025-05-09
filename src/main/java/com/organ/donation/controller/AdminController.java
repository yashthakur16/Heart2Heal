package com.organ.donation.controller;

import com.organ.donation.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PutMapping("/verify/donor/{donorId}")
    public ResponseEntity<String> verifyDonor(@PathVariable Long donorId) {
        return ResponseEntity.ok(adminService.verifyDonor(donorId));
    }

    @PutMapping("/reject/donor/{donorId}")
    public ResponseEntity<String> rejectDonor(@PathVariable Long donorId) {
        return ResponseEntity.ok(adminService.rejectDonor(donorId));
    }

    @PutMapping("/verify/recipient/{recipientId}")
    public ResponseEntity<String> verifyRecipient(@PathVariable Long recipientId) {
        return ResponseEntity.ok(adminService.verifyRecipient(recipientId));
    }

    @PutMapping("/reject/recipient/{recipientId}")
    public ResponseEntity<String> rejectRecipient(@PathVariable Long recipientId) {
        return ResponseEntity.ok(adminService.rejectRecipient(recipientId));
    }
}
