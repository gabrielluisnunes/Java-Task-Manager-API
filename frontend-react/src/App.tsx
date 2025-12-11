import { useState, useEffect } from 'react';
import axios from 'axios';
import { type Task } from './types'; 
import './App.css'; 

// URL API
const API_URL = 'http://localhost:8080/api/tasks';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função que busca a lista de tarefas
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        // GET para a rota pública
        const response = await axios.get<Task[]>(API_URL);
        setTasks(response.data);
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar tarefas:", err);
        setError(" Não foi possível conectar à API. Verifique se o backend está rodando na porta 8080.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []); 

  if (loading) {
    return <div className="container">Carregando tarefas</div>;
  }

  return (
    <div className="container">
      <h1>Gerenciador de Tarefas</h1>
      
      {}
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
      
      <h2>Lista de Tarefas</h2>
      
      {tasks.length === 0 && !error ? (
        <p>Nenhuma tarefa encontrada. (Conexão OK)</p>
      ) : (
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <small>{task.completed ? 'Completa' : 'Pendente'}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;