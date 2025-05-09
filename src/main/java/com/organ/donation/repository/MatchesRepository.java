package com.organ.donation.repository;

import com.organ.donation.model.Matches;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchesRepository extends JpaRepository<Matches, Long> {

   }
