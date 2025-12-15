package com.taskmanager.api_task_manager.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer; 
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy; 
import org.springframework.security.web.SecurityFilterChain;

import java.util.List;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. CONFIGURAÇÃO CORS 
            .cors(cors -> cors.configurationSource(request -> {
                CorsConfiguration config = new CorsConfiguration();
                // Permitir o domínio exato do React
                config.setAllowedOrigins(List.of("http://localhost:5173"));
                // Permitir todos os métodos
                config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
                config.setAllowedHeaders(List.of("*"));
                return config;
            }))

            .csrf(csrf -> csrf.disable()) 
            
            // Adiciona a configuração de Sessão Stateless
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            
            .authorizeHttpRequests(authorize -> authorize
                
                // Rotas de Documentação (Swagger)
                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                
                // GETs são públicos, e OPTIONS também deve ser permitido
                .requestMatchers(HttpMethod.GET, "/api/tasks").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/tasks/**").permitAll()
                .requestMatchers(HttpMethod.OPTIONS, "/api/tasks/**").permitAll()

                // (POST, PATCH, DELETE) exige autenticação
                .anyRequest().authenticated()
            )
            .httpBasic(Customizer.withDefaults()); 

        return http.build();
    }
}