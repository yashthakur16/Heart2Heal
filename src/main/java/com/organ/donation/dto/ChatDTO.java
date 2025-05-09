package com.organ.donation.dto;

import java.time.LocalDateTime;

public class ChatDTO {
    private Long chatId;
    private UserDTO sender;
    private UserDTO receiver;
    private String message;
    private LocalDateTime timestamp;

    public ChatDTO(Long chatId, UserDTO sender, UserDTO receiver, String message, LocalDateTime timestamp) {
        this.chatId = chatId;
        this.sender = sender;
        this.receiver = receiver;
        this.message = message;
        this.timestamp = timestamp;
    }

    // Getters
    public Long getChatId() { return chatId; }
    public UserDTO getSender() { return sender; }
    public UserDTO getReceiver() { return receiver; }
    public String getMessage() { return message; }
    public LocalDateTime getTimestamp() { return timestamp; }
}
