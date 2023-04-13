package com.innershiift.auth.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
//import com.google.gson.*;

import java.sql.SQLOutput;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Configuration
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
//        System.out.println("Auth header " + authHeader);
//        String requestData = request.getReader().lines().collect(Collectors.joining());
//        Gson gson = new Gson();
//        RefreshToken u = gson.fromJson(requestData, RefreshToken.class);
//        System.out.println("Auth body " + request.getReader().toString());
        if(authHeader == null || !authHeader.startsWith("Bearer ")) {

            if(request.getRequestURI().startsWith("/api/v1/app/ws/")) {
                System.out.println("Websocket: " + request.getRequestURI());
                filterChain.doFilter(request, response);
            }
            else {
                System.out.println("Filtered out!");
                filterChain.doFilter(request, response);
                return;
            }
        }
        if(!request.getRequestURI().startsWith("/api/v1/app/ws/")) {
        jwt = authHeader.substring(7);
         userEmail = jwtService.extractUsername(jwt);
         if(userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
             UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
             if (jwtService.isTokenValid(jwt, userDetails)) {
                 System.out.println("is valid!");
                 UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                         userDetails,
                         null,
                         userDetails.getAuthorities()
                 );
                 authToken.setDetails(
                         new WebAuthenticationDetailsSource().buildDetails(request)
                 );
                 SecurityContextHolder.getContext().setAuthentication(authToken);
                 filterChain.doFilter(request, response);
             } else {
                 filterChain.doFilter(request, response);
//                 System.out.println("Filtered out!");
                 return;
             }
         }
         }
    }
}
