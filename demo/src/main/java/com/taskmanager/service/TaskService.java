package com.taskmanager.service;

import com.taskmanager.Task;
import com.taskmanager.repository.TaskRepository;  

import java.util.List;

public class TaskService {
    // service agora depende do repository para acesar os dados
    private final TaskRepository repository;
    // construtor: recebe o repositorio
    public TaskService( TaskRepository repository) {
        this.repository = repository;
    }

    // Método para criar uma nova tarefa
    public Task createTask(Task task) {
        // Regra de negócio: Título não pode ser vazio
        if (task.getTitle() == null || task.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("O título da tarefa não pode ser vazio.");
        }
        // Salva a tarefa usando o repositório
        return repository.save(task);
    }

    // Método para buscar todas as tarefas
    public List<Task> getAllTasks() {
        return repository.findAll();
    }
}
