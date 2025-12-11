package com.taskmanager.api_task_manager.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer; 
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy; 
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception { 
        http
            .csrf(csrf -> csrf.disable()) 
            
            // Adiciona a configuração de Sessão Stateless
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            
            .authorizeHttpRequests(authorize -> authorize

                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                //  GETs são públicos
                .requestMatchers(HttpMethod.GET, "/api/tasks").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/tasks/**").permitAll()
                
                // (POST, PATCH, DELETE) exige autenticação
                .anyRequest().authenticated()
            )
            .httpBasic(Customizer.withDefaults()); 

        return http.build();
    }
}