package com.taskmanager.service;

import com.taskmanager.Task;
import com.taskmanager.repository.TaskRepository; 
import java.util.List;
import java.util.NoSuchElementException; 

public class TaskService {
    // service agora depende do repository para acesar os dados
    private final TaskRepository repository;
    
    // construtor: recebe o repositorio
    public TaskService( TaskRepository repository) {
        this.repository = repository;
    }

    // Método para criar uma nova tarefa (sem alteração)
    public Task createTask(Task task) {
        // Regra de negócio: Título não pode ser vazio
        if (task.getTitle() == null || task.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("O título da tarefa é obrigatório.");
        }
        // Salva a tarefa usando o repositório
        return repository.save(task);
    }

    //  Buscar todas as tarefas
    public List<Task> getAllTasks() {
        return repository.findAll();
    }

    // Método para buscar por id com tratamento de erro
    public Task findTaskById(Long id) { 
        
        // IllegalArgumentException é tipicamente usada para argumentos inválidos (como um título vazio).
        return repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Tarefa com ID " + id + " não encontrada."));
    }

    // Metedo de update
    public Task updateTask(Long id, Task taskDetails) {
        Task existingTask = repository.findById(id)
        .orElseThrow(()-> new NoSuchElementException("Tarefa com ID " + id + " não encontrada."));

        if (taskDetails.getTitle() == null || taskDetails.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("O título da tarefa é obrigatório.");
        }

        existingTask.setTitle(taskDetails.getTitle());
        existingTask.setDescription(taskDetails.getDescription());
        existingTask.setCompleted(taskDetails.isCompleted());

        return repository.save(existingTask);
    }
}