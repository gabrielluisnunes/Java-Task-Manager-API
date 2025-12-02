package com.taskmanager.api_task_manager;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor

public class Task {
    private Long id;
    private String title;
    private String description;
    private boolean completed = false;
}