package com.organ.donation.service;

import com.organ.donation.model.Donor;
import com.organ.donation.model.User;
import com.organ.donation.repository.DonorRepository;
import com.organ.donation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DonorService {

    @Autowired
    private DonorRepository donorRepository;

    @Autowired
    private UserRepository userRepository;

    public String postDonation(Donor donor, Long userId) {
        // Fetch user from DB
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        // Set user and status
        donor.setUser(user);
        donor.setStatus("Pending");

        // Save donor
        donorRepository.save(donor);
        return "Donation request submitted successfully!";
    }

    public String requestVerification(Long donorId) {
        Optional<Donor> donorOpt = donorRepository.findById(donorId);
        if (donorOpt.isPresent()) {
            Donor donor = donorOpt.get();
            donor.setStatus("Under Review"); // Corrected status update
            donorRepository.save(donor);
            return "Verification requested successfully!";
        }
        return "Donor not found!";
    }

    public List<Donor> getAllDonors() {
        return donorRepository.findAll();
    }
}
