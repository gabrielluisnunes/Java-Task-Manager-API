package com.taskmanager.repository;

import com.taskmanager.Task;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.ArrayList;
import java.util.List;


public class TaskRepository {
    //Simulando Banco de Dados com um Map
    private final Map<Long, Task> tasks = new ConcurrentHashMap<>();
    private long nextId = 1L;

    //Salvar/Atualizar Tarefa
    public Task save(Task task) {
        if (task.getId() == null) {
            task.setId(nextId++);
        }
        tasks.put(task.getId(), task);
        return task;
    }

    public Optional<Task> findById(Long id) {
        return Optional.ofNullable(tasks.get(id));
    }

    public List<Task> findAll(){
        return new ArrayList<>(tasks.values());
    }

    public void deleteById(Long id) {
        tasks.remove(id);
    }
}
