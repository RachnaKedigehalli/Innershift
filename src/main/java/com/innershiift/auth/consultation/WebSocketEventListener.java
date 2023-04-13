package com.innershiift.auth.consultation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

public class WebSocketEventListener {
    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        System.out.println("Received a new web socket connection");
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        Integer username = headerAccessor.getSessionAttributes() != null ? (Integer) headerAccessor.getSessionAttributes().get("username"):null;

        if(username != null) {
            System.out.println("User Disconnected : " + username);

            Message chatMessage = new Message();
            chatMessage.setSenderId(username);

            messagingTemplate.convertAndSend("/topic/publicChatRoom", chatMessage);
        }
    }
}
