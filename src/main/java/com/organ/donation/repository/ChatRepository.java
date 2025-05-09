package com.organ.donation.repository;

import com.organ.donation.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {

    @Query("SELECT c FROM Chat c WHERE (c.sender.id = :user1Id AND c.receiver.id = :user2Id) OR (c.sender.id = :user2Id AND c.receiver.id = :user1Id) ORDER BY c.timestamp ASC")
    List<Chat> findChatHistory(@Param("user1Id") Long user1Id, @Param("user2Id") Long user2Id);
}
