package com.taskmanager.api_task_manager.exception;

public class ResourceNotFoundException extends RuntimeException {

    // Construtor que aceita uma mensagem de erro
    public ResourceNotFoundException(String message) {
        super(message);
    }
}