package com.organ.donation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.organ.donation.model.Notification;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    // Fetch only unread notifications for a user
    List<Notification> findByUserIdAndStatusFalseOrderByTimestampDesc(Long userId);
    
    // Fetch all notifications (both read & unread) for a user
    List<Notification> findByUserIdOrderByTimestampDesc(Long userId);
}
