package com.taskmanager.api_task_manager.service;

import org.springframework.stereotype.Service;

import com.taskmanager.api_task_manager.exception.ResourceNotFoundException;
import com.taskmanager.api_task_manager.model.Task;
import com.taskmanager.api_task_manager.repository.TaskRepository;
import org.springframework.lang.NonNull; 

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class TaskService {

    private static final Logger log = LoggerFactory.getLogger(TaskService.class);

    private static final String TASK_NOT_FOUND_MSG = "Tarefa com ID %d não encontrada.";

    private final TaskRepository repository;

    // Construtor para Injeção de Dependência
    public TaskService( TaskRepository repository) {
        this.repository = repository;
    }

    // CREATE
    public Task createTask(Task task) {
        log.info("Criando nova tarefa com título: {}", task.getTitle());
        return repository.save(task);
    }

    // READ BY ID
    public Task findTaskById(@NonNull Long id) {
       
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format(TASK_NOT_FOUND_MSG, id)));
    }

    // UPDATE
    public Task updateTask(@NonNull Long id, Task taskDetails) {
        log.info("Tentativa de atualizar tarefa ID: {}", id);

        Task existingTask = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format(TASK_NOT_FOUND_MSG, id)));

        existingTask.setTitle(taskDetails.getTitle());
        existingTask.setDescription(taskDetails.getDescription());
        existingTask.setCompleted(taskDetails.isCompleted());

        return repository.save(existingTask);
    }

 public Task updatePartial(Long id, Task partialTask) {
    if (id == null) {
        return null;
    }

    return repository.findById(id)
            .map(existingTask -> {
                // Atualiza apenas o campo 'completed'
                existingTask.setCompleted(partialTask.isCompleted());
                
                // Atualiza title e description apenas se foram enviados no JSON
                if (partialTask.getTitle() != null) {
                    existingTask.setTitle(partialTask.getTitle());
                }
                if (partialTask.getDescription() != null) {
                    existingTask.setDescription(partialTask.getDescription());
                }
                
                // Salva a tarefa atualizada
                return repository.save(existingTask);
            })
            .orElse(null); 
}

    // DELETE
    public void deleteTaskById(@NonNull Long id) {
        log.warn("Excluindo permanentemente a tarefa ID: {}", id);

        repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format(TASK_NOT_FOUND_MSG, id)));

        repository.deleteById(id);
    }

    // READ ALL
    public List<Task> getAllTasks() {
        return repository.findAll();
    }
}