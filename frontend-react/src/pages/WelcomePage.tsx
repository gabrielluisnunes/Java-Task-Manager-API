import { useState, useEffect } from 'react'; 
import styled from 'styled-components';
import { 
  LogOut, Plus, CheckCircle2, 
  Star, Home, List, User, Trash2, Circle 
} from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import api from '../services/api'; 

// --- Estilos de Layout 
const ShellContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  padding: 1.5rem 1.5rem 100px 1.5rem; 
  box-sizing: border-box;
`;

const ContentArea = styled.main`
  width: 100%;
  max-width: 600px; 
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TaskCard = styled.div<{ completed: boolean }>`
  background: ${props => props.theme.colors.glass};
  border: 1px solid ${props => props.completed ? 'rgba(34, 197, 94, 0.3)' : props.theme.colors.border};
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s;
  opacity: ${props => props.completed ? 0.6 : 1};

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.05);
  }
`;

const BottomNav = styled.nav`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 400px;
  height: 65px;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
  z-index: 100;
`;

const NavItem = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  color: ${props => props.active ? '#6366f1' : '#94a3b8'};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  font-size: 0.7rem;
  transition: color 0.2s;

  &:hover { color: #6366f1; }
`;

interface Task {
  id: number;
  title: string;      
  description?: string;
  completed: boolean;
}

export const WelcomePage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState('');

  // 1. CARREGAR TAREFAS (GET)
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await api.get('/tasks'); 
        setTasks(response.data);
      } catch (error) {
        console.error("Erro ao carregar:", error);
      }
    };
    loadTasks();
  }, []);

  // 2. ADICIONAR TAREFA (POST)
  const addTask = async () => {
    if (!taskInput.trim()) return;
    try {
      const response = await api.post('/tasks', { 
        title: taskInput,     
        completed: false 
      });
      setTasks([response.data, ...tasks]);
      setTaskInput('');
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar no banco. Verifique se o backend está associando o User corretamente.");
    }
  };

  // 3. ATUALIZAR STATUS (PATCH)
  const toggleTask = async (task: Task) => {
    try {
      const updatedStatus = { completed: !task.completed };
      const response = await api.patch(`/tasks/${task.id}`, updatedStatus);
      setTasks(tasks.map(t => t.id === task.id ? response.data : t));
    } catch (error) {
      alert("Erro ao atualizar status.");
    }
  };

  // 4. DELETAR TAREFA (DELETE)
  const deleteTask = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      alert("Erro ao excluir.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <ShellContainer>
      <ContentArea>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ color: 'white', fontSize: '1.8rem', margin: 0 }}>Minhas Tarefas</h2>
            <p style={{ color: '#94a3b8' }}>{tasks.filter(t => !t.completed).length} pendentes</p>
          </div>
          <button onClick={handleLogout} style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', padding: '8px', borderRadius: '10px', cursor: 'pointer' }}>
            <LogOut size={20} />
          </button>
        </header>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Input 
            icon={Plus} 
            placeholder="Nova tarefa..." 
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />
          <Button onClick={addTask} style={{ width: 'auto', padding: '0 20px' }}>
            Adicionar
          </Button>
        </div>

        <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {tasks.map(task => (
            <TaskCard key={task.id} completed={task.completed}>
              <div 
                style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, cursor: 'pointer' }} 
                onClick={() => toggleTask(task)}
              >
                {task.completed ? 
                  <CheckCircle2 size={22} color="#22c55e" /> : 
                  <Circle size={22} color="#475569" />
                }
                <span style={{ color: 'white', textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.title}
                </span>
              </div>
              <button onClick={() => deleteTask(task.id)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <Trash2 size={18} />
              </button>
            </TaskCard>
          ))}
        </section>
      </ContentArea>

      <BottomNav>
        <NavItem active><Home size={24} />Início</NavItem>
        <NavItem><List size={24} />Tarefas</NavItem>
        <NavItem><Star size={24} />Favoritos</NavItem>
        <NavItem><User size={24} />Perfil</NavItem>
      </BottomNav>
    </ShellContainer>
  );
};