package com.organ.donation.repository;

import com.organ.donation.model.Donor;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DonorRepository extends JpaRepository<Donor, Long> 
{
	 List<Donor> findByStatus(String status);
	 
	 @Query("SELECT d FROM Donor d WHERE d.organType = :organType AND d.bloodType = :bloodType AND d.status = 'Verified'")
	    List<Donor> findMatchingDonors(@Param("organType") String organType, @Param("bloodType") String bloodType);
}
