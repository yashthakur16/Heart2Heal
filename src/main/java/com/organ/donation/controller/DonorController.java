package com.organ.donation.controller;

import com.organ.donation.model.Donor;
import com.organ.donation.service.DonorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/donor")
@CrossOrigin(origins = "*") // Allow frontend access
public class DonorController {

    @Autowired
    private DonorService donorService;

    @PostMapping("/donate")
    public ResponseEntity<String> postDonation(@RequestBody DonorRequest donorRequest) {
        System.out.println("Received donation request for User ID: " + donorRequest.getUserId());

        if (donorRequest.getUserId() == null) {
            return ResponseEntity.badRequest().body("User ID is missing in the request.");
        }

        Donor donor = new Donor();
        donor.setOrganType(donorRequest.getOrganType());
        donor.setBloodType(donorRequest.getBloodType());
        donor.setFullName(donorRequest.getFullName());
        donor.setDob(donorRequest.getDob());
        donor.setGender(donorRequest.getGender());
        donor.setPhone(donorRequest.getPhone());
        donor.setEmail(donorRequest.getEmail());
        donor.setAddress(donorRequest.getAddress());
        donor.setMedicalHistory(donorRequest.getMedicalHistory());
        donor.setLifestyleHabits(donorRequest.getLifestyleHabits());
        donor.setEmergencyContact(donorRequest.getEmergencyContact());
        donor.setLegalConsent(donorRequest.isLegalConsent());

        String response = donorService.postDonation(donor, donorRequest.getUserId());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/verify/{donorId}")
    public ResponseEntity<String> requestVerification(@PathVariable Long donorId) {
        return ResponseEntity.ok(donorService.requestVerification(donorId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Donor>> getAllDonors() {
        return ResponseEntity.ok(donorService.getAllDonors());
    }
}

class DonorRequest {
    private Long userId;
    private String organType;
    private String bloodType;
    private String fullName;
    private String dob;
    private String gender;
    private String phone;
    private String email;
    private String address;
    private String medicalHistory;
    private String lifestyleHabits;
    private String emergencyContact;
    private boolean legalConsent;

    // Getters & Setters
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    public String getOrganType() {
        return organType;
    }
    public void setOrganType(String organType) {
        this.organType = organType;
    }
    public String getBloodType() {
        return bloodType;
    }
    public void setBloodType(String bloodType) {
        this.bloodType = bloodType;
    }
    public String getFullName() {
        return fullName;
    }
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    public String getDob() {
        return dob;
    }
    public void setDob(String dob) {
        this.dob = dob;
    }
    public String getGender() {
        return gender;
    }
    public void setGender(String gender) {
        this.gender = gender;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public String getMedicalHistory() {
        return medicalHistory;
    }
    public void setMedicalHistory(String medicalHistory) {
        this.medicalHistory = medicalHistory;
    }
    public String getLifestyleHabits() {
        return lifestyleHabits;
    }
    public void setLifestyleHabits(String lifestyleHabits) {
        this.lifestyleHabits = lifestyleHabits;
    }
    public String getEmergencyContact() {
        return emergencyContact;
    }
    public void setEmergencyContact(String emergencyContact) {
        this.emergencyContact = emergencyContact;
    }
    public boolean isLegalConsent() {
        return legalConsent;
    }
    public void setLegalConsent(boolean legalConsent) {
        this.legalConsent = legalConsent;
    }
}
