package com.organ.donation.controller;

import com.organ.donation.dto.ChatDTO;
import com.organ.donation.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chats")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping("/send")
    public ResponseEntity<String> sendMessage(@RequestBody ChatRequest chatRequest) {
        String response = chatService.sendMessage(chatRequest.getSenderId(), chatRequest.getReceiverId(), chatRequest.getMessage());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/history")
    public ResponseEntity<List<ChatDTO>> getChatHistory(@RequestParam Long user1Id,
                                                        @RequestParam Long user2Id) {
        List<ChatDTO> chatHistory = chatService.getChatHistory(user1Id, user2Id);
        return ResponseEntity.ok(chatHistory);
    }

    public static class ChatRequest {
        private Long senderId;
        private Long receiverId;
        private String message;

        // Getters and Setters
        public Long getSenderId() { return senderId; }
        public void setSenderId(Long senderId) { this.senderId = senderId; }

        public Long getReceiverId() { return receiverId; }
        public void setReceiverId(Long receiverId) { this.receiverId = receiverId; }

        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }
}
