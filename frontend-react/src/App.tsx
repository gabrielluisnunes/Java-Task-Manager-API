import { useState, useEffect, type FormEvent } from 'react'; 
import axios from 'axios';
import { type Task } from './types'; 
import './App.css'; 

const API_URL = 'http://localhost:8080/api/tasks';

// Credenciais de Autenticação
const AUTH_CONFIG = {
  auth: {
    username: 'admin', 
    password: 'admin123'
  }
};

function App() {
  // --- Estados da Aplicação ---
  const [tasks, setTasks] = useState<Task[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para o novo formulário de tarefa
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  // --- Funções de Comunicação com a API ---

  // Função para buscar tarefas (GET)
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Task[]>(API_URL);
      setTasks(response.data);
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar tarefas:", err);
      setError("🛑 Não foi possível conectar à API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []); 

  // Função para CRIAR uma nova tarefa (POST)
  const handleCreateTask = async (e: FormEvent) => {
    e.preventDefault();
    // Verifica se o título não está vazio
    if (!newTaskTitle.trim()) return;

    setIsCreating(true);
    setError(null);

    try {
      const newTaskData = {
        title: newTaskTitle,
        description: newTaskDescription,
        completed: false
      };
      
      // Envio do POST com a configuração de autenticação 
      const response = await axios.post<Task>(API_URL, newTaskData, AUTH_CONFIG);
      
      // Adicionar a nova tarefa à lista localmente
      setTasks(prevTasks => [...prevTasks, response.data]);

      // Limpar o formulário
      setNewTaskTitle('');
      setNewTaskDescription('');

    } catch (err) {
      console.error("Erro ao criar tarefa:", err);
      setError("❌ Falha ao criar tarefa. Verifique as credenciais de autenticação.");
    } finally {
      setIsCreating(false);
    }
  };

  // Função para Atualizar tarefa
  const handleToggleCompleted = async(task: Task) => {
    setError(null);
    try {
      const updatedData = { completed: !task.completed };
      //Envia o PATCH para API
      await axios.patch(`${API_URL}/${task.id}`, updatedData, AUTH_CONFIG);
      //Atualiza a tarefa localmente
      setTasks(prevTasks => prevTasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
    }catch (err) {
      console.error("Erro ao atualizar tarefa:", err);
      setError("❌ Falha ao atualizar tarefa. Verifique as credenciais de autenticação.");
    }
  };

  // Função para DELETAR a tarefa 
  const handleDeleteTask = async (id: number) => {
    if (!globalThis.confirm("Tem certeza que deseja excluir esta tarefa?")) return;
    
    setError(null);
    try {
      // Envia o DELETE para a API
      await axios.delete(`${API_URL}/${id}`, AUTH_CONFIG);
      
      // Remove do estado localmente
      setTasks(prevTasks => prevTasks.filter(t => t.id !== id));
      
    } catch (err) {
      console.error("Erro ao deletar tarefa:", err);
      setError(" Falha ao deletar tarefa. Verifique as credenciais de autenticação.");
    }
  };


  if (loading) {
    return <div className="container">Carregando tarefas...</div>;
  }

  // --- Renderização do Componente ---

  return (
    <div className="container">
      <h1>Gerenciador de Tarefas</h1>
      
      {error && <p style={{ color: 'var(--color-danger)', fontWeight: 'bold' }}>{error}</p>}
      
      {/* --- FORMULÁRIO DE CRIAÇÃO --- */}
      <form className="task-form" onSubmit={handleCreateTask}>
        <input
          type="text"
          placeholder="Título da nova tarefa (Obrigatório)"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          required
          disabled={isCreating}
        />
        <textarea
          placeholder="Descrição (Opcional)"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          disabled={isCreating}
        />
        <button type="submit" disabled={isCreating}>
          {isCreating ? 'Adicionando...' : 'Adicionar Tarefa'}
        </button>
      </form>

      {/* --- LISTA DE TAREFAS --- */}
      <h2>Tarefas Pendentes ({tasks.filter(t => !t.completed).length})</h2>
      
      {tasks.length === 0 ? (
        <p>Ainda não há tarefas. Crie uma acima!</p>
      ) : (
      <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <div className="task-content">
                <strong>{task.title}</strong>
                <p>{task.description}</p>
                <small>{task.completed ? 'Completa' : 'Pendente'}</small>
              </div>
              
              <div className="task-actions">
                {}
                <button 
                  className={task.completed ? 'btn-undo' : 'btn-complete'}
                  onClick={() => handleToggleCompleted(task)}
                >
                  {task.completed ? 'Desfazer' : 'Concluir'}
                </button>
                
                {}
                <button 
                  className="btn-delete"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;