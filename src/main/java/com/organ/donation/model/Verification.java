package com.organ.donation.model;

import jakarta.persistence.*;

@Entity
@Table(name = "verification")
public class Verification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 500)
    private String medicalHistory;

    @Column(nullable = false, length = 500)
    private String lifestyleHabits;

    @Column(nullable = false)
    private boolean legalConsent;

    @Column(nullable = false)
    private String adminApproval; // Pending, Approved, Rejected

    // Constructors
    public Verification() {}

    public Verification(User user, String medicalHistory, String lifestyleHabits, boolean legalConsent, String adminApproval) {
        this.user = user;
        this.medicalHistory = medicalHistory;
        this.lifestyleHabits = lifestyleHabits;
        this.legalConsent = legalConsent;
        this.adminApproval = adminApproval;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public boolean isLegalConsent() {
        return legalConsent;
    }

    public void setLegalConsent(boolean legalConsent) {
        this.legalConsent = legalConsent;
    }

    public String getAdminApproval() {
        return adminApproval;
    }

    public void setAdminApproval(String adminApproval) {
        this.adminApproval = adminApproval;
    }
}
