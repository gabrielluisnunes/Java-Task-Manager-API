package com.taskmanager.service;

import com.taskmanager.Task;
import com.taskmanager.repository.TaskRepository; 
import java.util.List;
import java.util.NoSuchElementException;

public class TaskService {
    
    // O Service depende do Repository (Injeção de Dependência)
    private final TaskRepository repository;
    
    // Construtor
    public TaskService( TaskRepository repository) {
        this.repository = repository;
    }

    // CREATE
    public Task createTask(Task task) {
        if (task.getTitle() == null || task.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("O título da tarefa é obrigatório.");
        }
        return repository.save(task);
    }

    // READ ALL
    public List<Task> getAllTasks() {
        return repository.findAll();
    }

    // READ BY ID
    public Task findTaskById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Tarefa com ID " + id + " não encontrada."));
    }
    
    // UPDATE
    public Task updateTask(Long id, Task taskDetails) {
        
        Task existingTask = repository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Tarefa com ID " + id + " não encontrada para atualização."));
            
        if (taskDetails.getTitle() == null || taskDetails.getTitle().trim().isEmpty()) {
             throw new IllegalArgumentException("O título da tarefa é obrigatório.");
        }
        
        existingTask.setTitle(taskDetails.getTitle());
        existingTask.setDescription(taskDetails.getDescription());
        existingTask.setCompleted(taskDetails.isCompleted());
        
        return repository.save(existingTask);
    }
    
    // DELETE (O MÉTODO QUE ESTAVA FALTANDO OU INCOMPLETO)
    public void deleteTaskById(Long id) {
        
        // 1. Valida se o ID existe (se não existir, o findById lança a exceção via orElseThrow)
        repository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Tarefa com ID " + id + " não encontrada para exclusão."));
        
        // 2. Executa a exclusão (Delegando ao Repositório)
        repository.deleteById(id);
    }
}