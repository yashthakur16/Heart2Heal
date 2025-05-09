package com.organ.donation.service;

import com.organ.donation.dto.ChatDTO;
import com.organ.donation.dto.UserDTO;
import com.organ.donation.model.Chat;
import com.organ.donation.model.User;
import com.organ.donation.repository.ChatRepository;
import com.organ.donation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationService notificationService;

    // Send a message
    public String sendMessage(Long senderId, Long receiverId, String message) {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        Chat chat = new Chat();
        chat.setSender(sender);
        chat.setReceiver(receiver);
        chat.setMessage(message);
        chat.setTimestamp(LocalDateTime.now());

        chatRepository.save(chat);

        // Send notification to the receiver
        notificationService.createNotification(receiverId, "You received a new message from " + sender.getName());

        return "Message sent successfully!";
    }

    // Get conversation history
    public List<ChatDTO> getChatHistory(Long user1Id, Long user2Id) {
        List<Chat> chatList = chatRepository.findChatHistory(user1Id, user2Id);

        return chatList.stream().map(chat -> new ChatDTO(
            chat.getChatId(),
            new UserDTO(chat.getSender().getId(), chat.getSender().getName(), chat.getSender().getEmail(), chat.getSender().getRole()),
            new UserDTO(chat.getReceiver().getId(), chat.getReceiver().getName(), chat.getReceiver().getEmail(), chat.getReceiver().getRole()),
            chat.getMessage(),
            chat.getTimestamp()
        )).collect(Collectors.toList());
    }
}
