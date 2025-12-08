package com.taskmanager.api_task_manager.repository;

import org.springframework.stereotype.Repository;

import com.taskmanager.api_task_manager.Task;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
}