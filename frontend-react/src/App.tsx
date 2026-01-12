import { useState, useEffect, type FormEvent } from 'react';
import axios from 'axios';
import { type Task } from './types';
import './App.css';

const API_BASE = 'http://localhost:8080/api';

function App() {
  // --- Estados de Autenticação ---
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  // --- Estados de Tarefas ---
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Configuração de Header com JWT
  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${token}` }
  });

  // --- Lógica de Login ---
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, credentials);
      const jwt = res.data.token;
      setToken(jwt);
      localStorage.setItem('token', jwt); // Salva para não perder no refresh
      setError(null);
    } catch (err) {
      setError("❌ Usuário ou senha inválidos.");
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setTasks([]);
  };

  // --- Lógica de Tarefas (Protegidas) ---
  const fetchTasks = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await axios.get<Task[]>(`${API_BASE}/tasks`, getAuthHeader());
      setTasks(res.data);
    } catch (err) {
      setError("🛑 Erro ao carregar tarefas. Sessão expirada?");
      if (axios.isAxiosError(err) && err.response?.status === 401) handleLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  const handleCreateTask = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const res = await axios.post<Task>(`${API_BASE}/tasks`, 
        { title: newTaskTitle, completed: false }, 
        getAuthHeader()
      );
      setTasks([...tasks, res.data]);
      setNewTaskTitle('');
    } catch (err) {
      setError("❌ Falha ao criar tarefa.");
    }
  };

  // --- Renderização Condicional ---

  // 1. TELA DE LOGIN
  if (!token) {
    return (
      <div className="container login-box">
        <h1>SaaS Login</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin} className="task-form">
          <input 
            type="text" 
            placeholder="Username" 
            onChange={e => setCredentials({...credentials, username: e.target.value})} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            onChange={e => setCredentials({...credentials, password: e.target.value})} 
          />
          <button type="submit">Entrar no Sistema</button>
        </form>
      </div>
    );
  }

  // 2. TELA DO GERENCIADOR (DASHBOARD)
  return (
    <div className="container">
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Minhas Tarefas</h1>
        <button className="btn-delete" onClick={handleLogout}>Sair</button>
      </header>

      {error && <p className="error">{error}</p>}

      <form className="task-form" onSubmit={handleCreateTask}>
        <input
          type="text"
          placeholder="O que precisa ser feito?"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      {loading ? <p>Carregando...</p> : (
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <span>{task.title}</span>
              {/* Adicione aqui os botões de delete/toggle que você já tinha */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;