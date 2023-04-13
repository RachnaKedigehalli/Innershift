package com.innershiift.auth.consultation;

import com.innershiift.auth.config.JwtService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.Message;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.MultiValueMap;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
public class RmeSessionChannelInterceptor implements ChannelInterceptor {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        System.out.println("Channel Interceptor");

        MessageHeaders headers = message.getHeaders();
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        MultiValueMap<String, String> multiValueMap = headers.get(StompHeaderAccessor.NATIVE_HEADERS,MultiValueMap.class);
        for(Map.Entry<String, List<String>> head : multiValueMap.entrySet())
        {
            System.out.println(head.getKey() + "#" + head.getValue());
            if(head.getKey().equals("jwt-token")) {
                System.out.println("auth header: " + (head.getValue().get(0)));
                String jwt = head.getValue().get(0);

                String userEmail = jwtService.extractUsername(jwt);
//                if(userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
                    if (jwtService.isTokenValid(jwt, userDetails)) {
                        System.out.println("is valid!");
                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                    }
//                }
            }
        }
        return message;
    }
}