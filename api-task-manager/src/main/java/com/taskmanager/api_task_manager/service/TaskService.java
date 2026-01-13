package com.taskmanager.api_task_manager.service;

import com.taskmanager.api_task_manager.exception.ResourceNotFoundException;
import com.taskmanager.api_task_manager.model.Task;
import com.taskmanager.api_task_manager.model.User;
import com.taskmanager.api_task_manager.repository.TaskRepository;
import com.taskmanager.api_task_manager.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    private User getAuthenticatedUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário logado não encontrado."));
    }

    public List<Task> getAllTasks() {
        return taskRepository.findByUserId(getAuthenticatedUser().getId());
    }

    public Task createTask(Task task) {
        Task safeTask = Objects.requireNonNull(task, "Tarefa não pode ser nula");
        safeTask.setUser(getAuthenticatedUser());
        return taskRepository.save(safeTask);
    }

    public Task findTaskById(Long id) {
        Long safeId = Objects.requireNonNull(id, "ID não pode ser nulo");
        User user = getAuthenticatedUser();
        
        return taskRepository.findById(safeId)
                .filter(t -> t.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new ResourceNotFoundException("Tarefa não encontrada ou acesso negado."));
    }

    public Task updatePartial(Long id, Task partialTask) {
    Task existingTask = findTaskById(id);
    Task data = Objects.requireNonNull(partialTask);

    if (data.getTitle() != null) existingTask.setTitle(data.getTitle());
    if (data.getDescription() != null) existingTask.setDescription(data.getDescription());
    if (data.getDueDate() != null) existingTask.setDueDate(data.getDueDate());
    if (data.getPriority() != null) existingTask.setPriority(data.getPriority());
    
    existingTask.setCompleted(data.isCompleted());

    return taskRepository.save(existingTask);
}

    public void deleteTaskById(Long id) {
        Task taskToDelete = findTaskById(id);
        taskRepository.delete(Objects.requireNonNull(taskToDelete));
    }
}