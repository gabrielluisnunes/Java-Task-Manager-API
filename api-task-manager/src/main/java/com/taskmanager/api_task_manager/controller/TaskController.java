package com.taskmanager.api_task_manager.controller;

import com.taskmanager.api_task_manager.model.Task;
import com.taskmanager.api_task_manager.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {
    
    private final TaskService taskService;
    
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody @NonNull Task task){
        return ResponseEntity.status(201).body(taskService.createTask(task));
    }
    
    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        return ResponseEntity.ok(taskService.getAllTasks());
    } 
    
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable @NonNull Long id){
        return ResponseEntity.ok(taskService.findTaskById(id));
    }
    
    @PatchMapping("/{id}")
    public ResponseEntity<Task> updateTaskPartial(
            @PathVariable @NonNull Long id,
            @RequestBody @NonNull Task partialTask) { 
        return ResponseEntity.ok(taskService.updatePartial(id, partialTask));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable @NonNull Long id) {
        taskService.deleteTaskById(id);
        return ResponseEntity.noContent().build();
    }
}