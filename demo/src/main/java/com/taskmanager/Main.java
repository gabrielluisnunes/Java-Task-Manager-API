package com.taskmanager;

public class Main {
    
    public static void main(String[] args) {
        
        System.out.println("--- Java Task Manager API (Simulação) ---");
        
        // 1. CRIANDO UM NOVO OBJETO (INSTANCIAÇÃO)
        Task minhaPrimeiraTarefa = new Task();
        
        System.out.println("\n--- 1. Tarefa Criada (Estado Inicial) ---");
        
        // Usando o GETTER para ler o estado padrão:
        System.out.println("Status Inicial: " + (minhaPrimeiraTarefa.isCompleted() ? "Concluída" : "Pendente")); 
        
        // 2. MODIFICANDO O ESTADO (USANDO SETTERS)
        minhaPrimeiraTarefa.setId(1L); 
        minhaPrimeiraTarefa.setTitle("Configurar o ambiente Java");
        minhaPrimeiraTarefa.setDescription("Garantir que o VS Code e o Maven estejam com Java 21.");
        
        // 3. ACESSANDO O ESTADO MODIFICADO (USANDO GETTERS)
        System.out.println("\n--- 2. Detalhes da Tarefa ---");
        System.out.println("ID: " + minhaPrimeiraTarefa.getId());
        System.out.println("Título: " + minhaPrimeiraTarefa.getTitle());
        System.out.println("Descrição: " + minhaPrimeiraTarefa.getDescription());
        System.out.println("Status: " + (minhaPrimeiraTarefa.isCompleted() ? "Concluída" : "Pendente"));
        
        // 4. MUDANÇA DE ESTADO 
        minhaPrimeiraTarefa.setCompleted(true);
        
        System.out.println("\n--- 3. Tarefa Concluída ---");
        System.out.println("Novo Status: " + (minhaPrimeiraTarefa.isCompleted() ? "Concluída" : "Pendente"));
        
    }
}