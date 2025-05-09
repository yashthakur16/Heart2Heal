package com.organ.donation.service;

import com.organ.donation.model.Notification;
import com.organ.donation.model.User;
import com.organ.donation.repository.NotificationRepository;
import com.organ.donation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    // Create a notification
    public void createNotification(Long userId, String message) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Notification notification = new Notification(user, message, LocalDateTime.now(), false);
        notificationRepository.save(notification);
    }

    // Get all unread notifications for a user
    public List<Notification> getUnreadNotifications(Long userId) {
        return notificationRepository.findByUserIdAndStatusFalseOrderByTimestampDesc(userId);
    }

    // Get all notifications (both read & unread) for a user
    public List<Notification> getAllNotifications(Long userId) {
        return notificationRepository.findByUserIdOrderByTimestampDesc(userId);
    }

    // Mark notification as read
    public void markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        notification.setStatus(true); // Mark as read
        notificationRepository.save(notification);
    }
}