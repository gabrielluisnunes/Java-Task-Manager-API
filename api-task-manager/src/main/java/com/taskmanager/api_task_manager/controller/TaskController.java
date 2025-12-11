package com.taskmanager.api_task_manager.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.lang.NonNull;

import com.taskmanager.api_task_manager.Task;
import com.taskmanager.api_task_manager.service.TaskService;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "htpp://localhost:5173")
public class TaskController {
    
    private final TaskService taskService;
    
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // CREATE (POST)
    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody Task task){
        Task createdTask = taskService.createTask(task);
        return ResponseEntity.status(201).body(createdTask);
    }
    
    // READ (GET ALL)
    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    } 
    
    // READ BY ID (GET)
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable @NonNull Long id){
        Task task = taskService.findTaskById(id);
        return ResponseEntity.ok(task);
    }
    
    // UPDATE (PATCH)
    @PatchMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable @NonNull Long id, @Valid @RequestBody Task taskDetails){
        Task updatedTask = taskService.updateTask(id, taskDetails);
        return ResponseEntity.ok(updatedTask);
    }
    
    // DELETE (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable @NonNull Long id) {
        taskService.deleteTaskById(id);
        return ResponseEntity.noContent().build();
    }
}