package com.organ.donation.controller;

import com.organ.donation.model.Matches;
import com.organ.donation.service.MatchingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/matching")
public class MatchingController {

    @Autowired
    private MatchingService matchingService;

    @PostMapping("/find")
    public ResponseEntity<String> findMatches(@RequestParam Long recipientId) {
        String message = matchingService.findAndStoreMatches(recipientId);
        return ResponseEntity.ok(message);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Matches>> getAllMatches() {
        return ResponseEntity.ok(matchingService.getAllMatches());
    }
}
