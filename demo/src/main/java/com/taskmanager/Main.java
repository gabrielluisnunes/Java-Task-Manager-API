package com.taskmanager;

import com.taskmanager.repository.TaskRepository;
import com.taskmanager.service.TaskService;
import com.taskmanager.service.TaskService;

import java.util.List;

public class Main {
    
    public static void main(String[] args) {
        
        System.out.println("--- Java Task Manager API - Arquitetura de 3 camadas ---");

        //instanciando o repositorio
        TaskRepository taskRepository = new TaskRepository();
        // 2. INSTANCIANDO O SERVIÇO (Injetando a dependência do Repositório)
        TaskService taskService = new TaskService(taskRepository);
    
        // --- 2. CRIANDO TAREFAS  ---
        
        // Criando a primeira tarefa
        Task tarefa1 = new Task();
        tarefa1.setTitle("Estudar Encapsulamento em Java");
        tarefa1.setDescription("Revisar Getters e Setters e Modificadores de Acesso.");
        
        // Chamando o método do Serviço. O Serviço atribui o ID e salva a tarefa.
        Task tarefaCriada1 = taskService.createTask(tarefa1);
        System.out.println("\n Tarefa Criada pelo Serviço: ID " + tarefaCriada1.getId());

        // Criando a segunda tarefa
        Task tarefa2 = new Task();
        tarefa2.setTitle("Fazer Commit Organizado no Git");
        
        Task tarefaCriada2 = taskService.createTask(tarefa2);
        System.out.println("✅ Tarefa Criada pelo Serviço: ID " + tarefaCriada2.getId());

        // --- 3. TESTANDO A REGRA DE NEGÓCIO ---
        // Tentamos criar uma tarefa SEM título. O Serviço deve lançar uma exceção.
        Task tarefaInvalida = new Task();
        
        System.out.println("\n--- 3. Teste de Validação (Título Vazio) ---");
        try {
            taskService.createTask(tarefaInvalida);
        } catch (IllegalArgumentException e) {
            // Se o serviço lançar a exceção, capturamos e mostramos a mensagem
            System.err.println(" REGRA DE NEGÓCIO VIOLADA: " + e.getMessage());
        }

        // --- 4. BUSCANDO TODAS AS TAREFAS ---
        List<Task> todasAsTarefas = taskService.getAllTasks();
        
        System.out.println("\n--- 4. Listando Todas as Tarefas (" + todasAsTarefas.size() + " Registros) ---");
        
        for (Task task : todasAsTarefas) {
            // Usamos um loop 'for-each' para iterar sobre a lista.
            String status = task.isCompleted() ? "✅" : "⏳";
            System.out.println(String.format("   [%s] ID: %d | Título: %s", status, task.getId(), task.getTitle()));
        }
    }
}