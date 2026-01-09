package com.taskmanager.api_task_manager.controller;

import com.taskmanager.api_task_manager.model.User;
import com.taskmanager.api_task_manager.service.AuthService;
import com.taskmanager.api_task_manager.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;

    // Injeção de dependências completa
    public AuthController(AuthService authService, JwtUtil jwtUtil, BCryptPasswordEncoder passwordEncoder) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    // 1. Endpoint de Registro
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        return ResponseEntity.ok(authService.register(user));
    }

    // 2. Endpoint de Login (Gera o Token JWT)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        return authService.findByUsername(username)
            .filter(user -> passwordEncoder.matches(password, user.getPassword()))
            .map(user -> ResponseEntity.ok(Map.of("token", jwtUtil.generateToken(username))))
            .orElse(ResponseEntity.status(401).build());
    }
}