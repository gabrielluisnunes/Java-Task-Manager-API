package com.taskmanager.api_task_manager.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer; 
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig { 

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception { 
        http
            .authorizeHttpRequests(authorize -> authorize
                // GETs são públicos
                .requestMatchers(HttpMethod.GET, "/api/tasks").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/tasks/**").permitAll()
                
                // O restante exige autenticação
                .anyRequest().authenticated()
            )
            // Sintaxe correta e estável do Spring Boot 3.x
            .httpBasic(Customizer.withDefaults())
            .csrf(csrf -> csrf.disable()); 

        return http.build();
    }
}