package com.organ.donation.service;

import com.organ.donation.model.Donor;
import com.organ.donation.model.Matches;
import com.organ.donation.model.Recipient;
import com.organ.donation.repository.MatchesRepository;
import com.organ.donation.repository.RecipientRepository;
import com.organ.donation.repository.DonorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MatchingService {

    @Autowired
    private MatchesRepository matchesRepository;

    @Autowired
    private RecipientRepository recipientRepository;

    @Autowired
    private DonorRepository donorRepository;

    @Autowired
    private NotificationService notificationService;

    public String findAndStoreMatches(Long recipientId) {
        Recipient recipient = recipientRepository.findById(recipientId)
                .orElseThrow(() -> new RuntimeException("Recipient not found!"));

        // Fetch donors from DonorRepository instead of MatchesRepository
        List<Donor> matchingDonors = donorRepository.findMatchingDonors(recipient.getOrganType(), recipient.getBloodType());

        if (matchingDonors.isEmpty()) {
            return "No matching donors found at the moment.";
        }

        for (Donor donor : matchingDonors) {
            Matches match = new Matches(donor, recipient, "Pending");
            matchesRepository.save(match);

            // Send notifications
            notificationService.createNotification(recipient.getUser().getId(), "A new donor match has been found for you!");
            notificationService.createNotification(donor.getUser().getId(), "A new recipient match has been found for your donation!");
        }

        return "Matching process completed!";
    }

    public List<Matches> getAllMatches() {
        return matchesRepository.findAll();
    }
}
