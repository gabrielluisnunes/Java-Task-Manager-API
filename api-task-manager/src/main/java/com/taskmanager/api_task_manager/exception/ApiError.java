package com.taskmanager.api_task_manager.exception;

import java.time.LocalDateTime;

public record ApiError(
    int status,
    String message,
    LocalDateTime timestamp
) {}
