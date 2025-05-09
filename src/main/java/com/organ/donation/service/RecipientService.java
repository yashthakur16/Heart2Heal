package com.organ.donation.service;

import com.organ.donation.model.Recipient;
import com.organ.donation.model.User;
import com.organ.donation.repository.RecipientRepository;
import com.organ.donation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipientService {

    @Autowired
    private RecipientRepository recipientRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MatchingService matchingService; // ✅ Inject MatchingService properly

    public String requestOrgan(Long userId, Recipient recipient) {
        // Fetch user from database
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Set user to recipient before saving
        recipient.setUser(user);
        recipient.setStatus("Pending");

        // Save the recipient request
        recipientRepository.save(recipient);

        // ✅ Trigger Matching System
        matchingService.findAndStoreMatches(recipient.getRecipientId());

        return "Organ request submitted! Matching process initiated.";
    }

    public String requestVerification(Long recipientId) {
        Optional<Recipient> recipient = recipientRepository.findById(recipientId);
        if (recipient.isPresent()) {
            recipient.get().setVerificationStatus("Under Review");
            recipientRepository.save(recipient.get());
            return "Verification requested!";
        }
        return "Recipient not found!";
    }

    public List<Recipient> getAllRecipients() {
        return recipientRepository.findAll();
    }
}
