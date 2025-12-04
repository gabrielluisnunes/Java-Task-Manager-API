package com.taskmanager.api_task_manager.service;

import com.taskmanager.api_task_manager.Task;
import com.taskmanager.api_task_manager.exception.ResourceNotFoundException; 
import com.taskmanager.api_task_manager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class TaskService {

    private static final Logger log = LoggerFactory.getLogger(TaskService.class);

    private static final String TASK_NOT_FOUND_MSG = "Tarefa com ID %d não encontrada.";

    private final TaskRepository repository;

    // Construtor para Injeção de Dependência
    public TaskService(@Autowired TaskRepository repository) {
        this.repository = repository;
    }

    // CREATE
    public Task createTask(Task task) {
        log.info("Criando nova tarefa com título: {}", task.getTitle());
        return repository.save(task);
    }

    // READ BY ID
    public Task findTaskById(Long id) {
        // Troquei NoSuchElementException por ResourceNotFoundException 
        return repository.findById(id)
             .orElseThrow(() -> new ResourceNotFoundException(String.format(TASK_NOT_FOUND_MSG, id)));
    }

    // UPDATE
    public Task updateTask(Long id, Task taskDetails) {
        log.info("Tentativa de atualizar tarefa ID: {}", id);

        // Trocquei NoSuchElementException por ResourceNotFoundException 
        Task existingTask = repository.findById(id)
             .orElseThrow(() -> new ResourceNotFoundException(String.format(TASK_NOT_FOUND_MSG, id)));

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

        // Troquei NoSuchElementException por ResourceNotFoundException 
        // Primeiro lançar a exceção se não existir
        repository.findById(id)
             .orElseThrow(() -> new ResourceNotFoundException(String.format(TASK_NOT_FOUND_MSG, id)));

        repository.deleteById(id);
    }

    // READ ALL
    public List<Task> getAllTasks() {
        return repository.findAll();
    }
}