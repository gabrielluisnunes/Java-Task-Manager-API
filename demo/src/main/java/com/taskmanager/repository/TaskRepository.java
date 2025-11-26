package com.taskmanager.repository;

import com.taskmanager.Task;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

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

    //Buscar tarefa por ID
    public List<Task> findAll() {
        return new ArrayList<>(tasks.values());
    }

    //Deletar Tarefa
    public void deleteById(Long id) {
        tasks.remove(id);
    }
}
