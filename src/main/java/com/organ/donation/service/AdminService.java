package com.organ.donation.service;

import com.organ.donation.model.Donor;
import com.organ.donation.model.Recipient;
import com.organ.donation.repository.DonorRepository;
import com.organ.donation.repository.RecipientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private DonorRepository donorRepository;

    @Autowired
    private RecipientRepository recipientRepository;

    @Autowired
    private NotificationService notificationService;

    public String verifyDonor(Long donorId) {
        Optional<Donor> donor = donorRepository.findById(donorId);
        if (donor.isPresent()) {
            donor.get().setStatus("Verified");
            donorRepository.save(donor.get());

            // Send notification
            notificationService.createNotification(donor.get().getUser().getId(), "Your donor verification has been approved.");

            return "Donor verified successfully!";
        }
        return "Donor not found!";
    }

    public String rejectDonor(Long donorId) {
        Optional<Donor> donor = donorRepository.findById(donorId);
        if (donor.isPresent()) {
            donor.get().setStatus("Rejected");
            donorRepository.save(donor.get());

            // Send notification
            notificationService.createNotification(donor.get().getUser().getId(), "Your donor verification has been rejected.");

            return "Donor rejected successfully!";
        }
        return "Donor not found!";
    }

    public String verifyRecipient(Long recipientId) {
        Optional<Recipient> recipient = recipientRepository.findById(recipientId);
        if (recipient.isPresent()) {
            recipient.get().setStatus("Verified");
            recipientRepository.save(recipient.get());

            // Send notification
            notificationService.createNotification(recipient.get().getUser().getId(), "Your recipient verification has been approved.");

            return "Recipient verified successfully!";
        }
        return "Recipient not found!";
    }

    public String rejectRecipient(Long recipientId) {
        Optional<Recipient> recipient = recipientRepository.findById(recipientId);
        if (recipient.isPresent()) {
            recipient.get().setStatus("Rejected");
            recipientRepository.save(recipient.get());

            // Send notification
            notificationService.createNotification(recipient.get().getUser().getId(), "Your recipient verification has been rejected.");

            return "Recipient rejected successfully!";
        }
        return "Recipient not found!";
    }
}
