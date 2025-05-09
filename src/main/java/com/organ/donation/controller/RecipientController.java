package com.organ.donation.controller;

import com.organ.donation.model.Recipient;
import com.organ.donation.service.RecipientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recipient")
public class RecipientController {

    @Autowired
    private RecipientService recipientService;

    @PostMapping("/request")
    public ResponseEntity<String> requestOrgan(
            @RequestParam Long userId, // Accept userId as a request parameter
            @RequestBody Recipient recipient) {
        return ResponseEntity.ok(recipientService.requestOrgan(userId, recipient));
    }

    @PutMapping("/verify/{recipientId}")
    public ResponseEntity<String> requestVerification(@PathVariable Long recipientId) {
        return ResponseEntity.ok(recipientService.requestVerification(recipientId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Recipient>> getAllRecipients() {
        return ResponseEntity.ok(recipientService.getAllRecipients());
    }
}
