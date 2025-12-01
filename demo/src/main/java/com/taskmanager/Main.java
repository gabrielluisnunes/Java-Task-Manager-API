package com.taskmanager;

import com.taskmanager.repository.TaskRepository;
import com.taskmanager.service.TaskService;

import java.util.List;
import java.util.NoSuchElementException;

public class Main {
    
    public static void main(String[] args) {
        
        System.out.println("--- Java Task Manager API - Arquitetura de 3 camadas ---");

        // 1. INSTANCIANDO AS CAMADAS (Injeção de Dependência Manual)
        TaskRepository taskRepository = new TaskRepository();
        TaskService taskService = new TaskService(taskRepository);
    
        // --- 2. CRIANDO TAREFAS ---
        Task tarefa1 = new Task();
        tarefa1.setTitle("Estudar Encapsulamento em Java");
        tarefa1.setDescription("Revisar Getters e Setters e Modificadores de Acesso.");
        Task tarefaCriada1 = taskService.createTask(tarefa1);
        System.out.println("\n Tarefa Criada pelo Serviço: ID " + tarefaCriada1.getId());

        Task tarefa2 = new Task();
        tarefa2.setTitle("Fazer Commit Organizado no Git");
        Task tarefaCriada2 = taskService.createTask(tarefa2);
        System.out.println("✅ Tarefa Criada pelo Serviço: ID " + tarefaCriada2.getId());

        // --- 3. TESTANDO A REGRA DE NEGÓCIO: TÍTULO VAZIO ---
        Task tarefaInvalida = new Task();
        System.out.println("\n--- 3. Teste de Validação (Título Vazio) ---");
        try {
            taskService.createTask(tarefaInvalida);
        } catch (IllegalArgumentException e) {
            System.err.println("❌ REGRA DE NEGÓCIO VIOLADA: " + e.getMessage());
        }

        // --- 4. TESTANDO A BUSCA POR ID E TRATAMENTO DE EXCEÇÃO (Optional) ---
        System.out.println("\n--- 4. Teste de Busca e Exceção ---");
        
        // Buscando uma tarefa que sabemos que existe (ID 1)
        try {
            //   Usando o nome correto do método no serviço
            Task tarefaEncontrada = taskService.findTaskById(1L); 
            System.out.println(" Tarefa ID 1 encontrada: " + tarefaEncontrada.getTitle());
        } catch (NoSuchElementException e) {
             
        } 
        
        // Tentando buscar uma tarefa que não existe (ID 99)
        try {
            taskService.findTaskById(99L);
        } catch (NoSuchElementException e) {
            // O catch correto é NoSuchElementException.
            System.err.println(" EXCEÇÃO TRATADA: " + e.getMessage());
        }

        System.out.println("\n-- Teste de Update de Tarefa --");

        Task updateDetails = new Task();
        updateDetails.setTitle("Estudar Encapsulamento em Java - Atualizado");
        updateDetails.setDescription("Revisar Getters, Setters e Modificadores de Acesso. - Atualizado");
        updateDetails.setCompleted(true);

        try {
            //Chamar serviço para atualizar a tarefa de ID 1
            Task updatedTask = taskService.updateTask(1L, updateDetails);

            System.out.println("Tarefa de ID 1 Atualizada:");
            System.out.println("Título: " + updatedTask.getTitle());
            System.out.println("Concluída: " + (updatedTask.isCompleted() ? "Sim" : "Não"));
        }catch (NoSuchElementException | IllegalArgumentException e) {
            System.err.println("Erro ao atualizar a tarefa: " + e.getMessage());
        }
        
           System.out.println("\n-- Teste do Delete --");

           try {
            taskService.deleteTaskById(2L); // Deletando ID 2
            System.out.println("✅ Tarefa ID 2 excluída com sucesso.");
        } catch (NoSuchElementException e) {
            System.err.println("❌ FALHA NA EXCLUSÃO: " + e.getMessage());
        }
        
        // Tentamos excluir uma tarefa que NÃO EXISTE (ID 10)
        try {
            taskService.deleteTaskById(10L);
        } catch (NoSuchElementException e) {
            System.err.println("❌ EXCEÇÃO TRATADA: " + e.getMessage());
        }
        
        // --- 5. BUSCANDO TODAS AS TAREFAS ---
        // CORREÇÃO: Este método estava causando erro antes. Agora deve funcionar.
        List<Task> todasAsTarefas = taskService.getAllTasks(); 
        
        System.out.println("\n--- 5. Listando Todas as Tarefas (" + todasAsTarefas.size() + " Registros) ---");
        
        for (Task task : todasAsTarefas) {
            String status = task.isCompleted() ? "✅" : "⏳";
            System.out.println(String.format("   [%s] ID: %d | Título: %s", status, task.getId(), task.getTitle()));
        }
    }
}