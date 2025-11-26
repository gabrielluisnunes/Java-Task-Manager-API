package com.taskmanager.service;

import com.taskmanager.Task;

import java.util.ArrayList;
import java.util.List;

public class TaskService {
    // Simulando o banco de dados
    private final List<Task> tasks = new ArrayList<>();
    private long nextId = 1L;
       
    public Task createTask(Task task) {
        if (task.getTitle() == null || task.getTitle().trim().isEmpty()){
            throw new IllegalArgumentException("O título da tarefa não pode ser vazio.");
        }

        task.setId(nextId++);
        tasks.add(task);

        return task;
    }

    public List<Task> getAllTasks() {
        return new ArrayList<>(tasks);
    }
}
