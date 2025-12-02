package com.taskmanager.api_task_manager.service;

import com.taskmanager.api_task_manager.Task;
import com.taskmanager.api_task_manager.repository.TaskRepository; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.slf4j.Logger; 
import org.slf4j.LoggerFactory; 

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class TaskService {
    
    // 1. PADRONIZAÇÃO SPRING: Instância do Logger (substitui System.out)
    private static final Logger log = LoggerFactory.getLogger(TaskService.class);

    // 2. CORREÇÃO DE AVISO: Constante para a mensagem de erro (SonarQube/Linter)
    private static final String TASK_NOT_FOUND_MSG = "Tarefa com ID %d não encontrada.";
    
    // O Service depende do Repository (Injeção de Dependência)
    private final TaskRepository repository;
    
    // 3. PADRONIZAÇÃO SPRING: Construtor para Injeção de Dependência
   
    public TaskService(@Autowired TaskRepository repository) {
        this.repository = repository;
    }

    // CREATE
    public Task createTask(Task task) {
        log.info("Criando nova tarefa com título: {}", task.getTitle()); 
        
        if (task.getTitle() == null || task.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("O título da tarefa é obrigatório.");
        }
        return repository.save(task);
    }

    // READ BY ID
    public Task findTaskById(Long id) {
        // Usa a constante TASK_NOT_FOUND_MSG 
        return repository.findById(id)
            .orElseThrow(() -> new NoSuchElementException(String.format(TASK_NOT_FOUND_MSG, id)));
    }
    
    // UPDATE
    public Task updateTask(Long id, Task taskDetails) {
        log.info("Tentativa de atualizar tarefa ID: {}", id); 
        
        // Usa a constante
        Task existingTask = repository.findById(id)
             .orElseThrow(() -> new NoSuchElementException(String.format(TASK_NOT_FOUND_MSG, id))); 
            
        if (taskDetails.getTitle() == null || taskDetails.getTitle().trim().isEmpty()) {
             throw new IllegalArgumentException("O título da tarefa é obrigatório.");
        }
        
        existingTask.setTitle(taskDetails.getTitle());
        existingTask.setDescription(taskDetails.getDescription());
        existingTask.setCompleted(taskDetails.isCompleted());
        
        return repository.save(existingTask);
    }
    
    // DELETE
    public void deleteTaskById(Long id) {
        log.warn("Excluindo permanentemente a tarefa ID: {}", id); 
        
        // Valida se o ID existe 
        repository.findById(id)
            .orElseThrow(() -> new NoSuchElementException(String.format(TASK_NOT_FOUND_MSG, id))); 
        
        repository.deleteById(id);
    }
    
    // ... READ ALL 
    public List<Task> getAllTasks() {
        return repository.findAll();
    }
}