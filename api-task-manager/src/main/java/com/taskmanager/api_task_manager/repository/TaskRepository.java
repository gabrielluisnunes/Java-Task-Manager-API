package com.taskmanager.api_task_manager.repository;

import com.taskmanager.api_task_manager.Task; 
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
}