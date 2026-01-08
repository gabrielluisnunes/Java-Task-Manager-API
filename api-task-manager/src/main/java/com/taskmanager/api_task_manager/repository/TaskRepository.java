package com.taskmanager.api_task_manager.repository;

import org.springframework.stereotype.Repository;

import com.taskmanager.api_task_manager.model.Task;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserId(Long userId);
}