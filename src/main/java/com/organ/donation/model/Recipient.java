package com.organ.donation.model;

import jakarta.persistence.*;


@Entity
@Table(name = "recipients")
public class Recipient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recipientId;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String organType;

    @Column(nullable = false)
    private String bloodType;

    @Column(nullable = false)
    private String status; 
        
    
	public Long getRecipientId() {
		return recipientId;
	}




	public void setRecipientId(Long recipientId) {
		this.recipientId = recipientId;
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




	public void setVerificationStatus(String string) {
		// TODO Auto-generated method stub
		
	}
    
    
    
}
