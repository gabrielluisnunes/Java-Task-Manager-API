package com.taskmanager.api_task_manager.controller;

import com.taskmanager.api_task_manager.Task;
import com.taskmanager.api_task_manager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    // Injeção de dependência do serviço de tarefas
    private final TaskService taskService;
    //Construtor com inejeção de dependência
    public TaskController(@Autowired TaskService taskService) {
        this.taskService = taskService;
    }

    //CREATE(POST)
    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody Task task){
        Task createdTask = taskService.createTask(task);
        return ResponseEntity.status(201).body(createdTask);
    }
    //READ(GET)
    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    } 
    //READ BY ID(GET)
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id){
        try{
            Task task = taskService.findTaskById(id);
            return ResponseEntity.ok(task);
        } catch (NoSuchElementException e){
            return ResponseEntity.notFound().build();
        }
    }
    //UPDATE(PUT)
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@Valid @PathVariable Long id, @RequestBody Task taskDetails){
        try{
            Task updateTask = taskService.updateTask(id, taskDetails);
            return ResponseEntity.ok(updateTask);
        }catch (NoSuchElementException e){
            return ResponseEntity.notFound().build();
        }catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().build();
        }
    }
    //DELETE(DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        try {
            taskService.deleteTaskById(id);
            return ResponseEntity.noContent().build(); 
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build(); 
        }
    }
    
}
