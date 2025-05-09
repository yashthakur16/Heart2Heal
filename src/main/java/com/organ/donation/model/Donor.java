package com.organ.donation.model;

import jakarta.persistence.*;

@Entity
@Table(name = "donors")
public class Donor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long donorId;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String organType;

    @Column(nullable = false)
    private String bloodType;

    @Column(nullable = false)
    private String status; // Pending, Verified, Rejected

    // New fields
    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String dob; // Date of Birth

    @Column(nullable = false)
    private String gender;

    @Column(nullable = false)
    private String phone; // Contact Number

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String address;

    private String medicalHistory;
    private String lifestyleHabits;
    private String emergencyContact;

    @Column(nullable = false)
    private boolean legalConsent;

	public Long getDonorId() {
		return donorId;
	}

	public void setDonorId(Long donorId) {
		this.donorId = donorId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
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
