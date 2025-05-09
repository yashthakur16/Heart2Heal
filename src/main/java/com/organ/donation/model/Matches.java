package com.organ.donation.model;

import jakarta.persistence.*;

@Entity
@Table(name = "matches")
public class Matches {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long matchId;

    @ManyToOne(fetch = FetchType.EAGER) // Ensure user data is loaded
    @JoinColumn(name = "donor_id", nullable = false)
    private Donor donor;

    @ManyToOne(fetch = FetchType.EAGER) // Ensure user data is loaded
    @JoinColumn(name = "recipient_id", nullable = false)
    private Recipient recipient;

    @Column(nullable = false)
    private String status; // Matched, In Progress, Completed

    // Constructors
    public Matches() {}

    public Matches(Donor donor, Recipient recipient, String status) {
        this.donor = donor;
        this.recipient = recipient;
        this.status = status;
    }

    // Getters and Setters
    public Long getMatchId() {
        return matchId;
    }

    public void setMatchId(Long matchId) {
        this.matchId = matchId;
    }

    public Donor getDonor() {
        return donor;
    }

    public void setDonor(Donor donor) {
        this.donor = donor;
    }

    public Recipient getRecipient() {
        return recipient;
    }

    public void setRecipient(Recipient recipient) {
        this.recipient = recipient;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
