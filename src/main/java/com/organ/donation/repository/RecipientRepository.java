package com.organ.donation.repository;

import com.organ.donation.model.Recipient;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipientRepository extends JpaRepository<Recipient, Long> 
{
	 List<Recipient> findByStatus(String status);
}
