package com.organ.donation.controller;

import com.organ.donation.model.Notification;
import com.organ.donation.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    // Get all notifications (read + unread) for a user
    @GetMapping("/{userId}")
    public ResponseEntity<List<Notification>> getNotifications(@PathVariable Long userId) {
        return ResponseEntity.ok(notificationService.getAllNotifications(userId));
    }

    // Get unread notifications for a user
    @GetMapping("/unread/{userId}")
    public ResponseEntity<List<Notification>> getUnreadNotifications(@PathVariable Long userId) {
        return ResponseEntity.ok(notificationService.getUnreadNotifications(userId));
    }

    // Mark a notification as read
    @PutMapping("/read/{notificationId}")
    public ResponseEntity<String> markAsRead(@PathVariable Long notificationId) {
        notificationService.markAsRead(notificationId);
        return ResponseEntity.ok("Notification marked as read.");
    }
}
