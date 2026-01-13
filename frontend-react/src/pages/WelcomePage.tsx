import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  LogOut, Plus, CheckCircle2, 
  Star, Home, List, User, Trash2, Circle,
  LayoutDashboard, CheckSquare, Clock
} from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import api from '../services/api';

// --- Estilos de Layout ---
const ShellContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background: radial-gradient(circle at top right, #1e293b, #0f172a);
  padding: 2rem 1.5rem 120px 1.5rem; 
  box-sizing: border-box;
`;

const ContentArea = styled.main`
  width: 100%;
  max-width: 600px; 
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

// --- Dashboard Cards ---
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 1.2rem;
  display: flex;
  align-items: center;
  gap: 12px;
  
  h3 { color: #94a3b8; font-size: 0.8rem; margin: 0; text-transform: uppercase; letter-spacing: 1px; }
  p { color: white; font-size: 1.5rem; font-weight: bold; margin: 0; }
`;

const TaskCard = styled.div<{ completed: boolean }>`
  background: ${props => props.theme.colors.glass};
  border: 1px solid ${props => props.completed ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
  border-radius: 18px;
  padding: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.2s, background 0.2s;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);

  &:hover {
    transform: scale(1.01);
    background: rgba(255, 255, 255, 0.05);
  }
`;

const BottomNav = styled.nav`
  position: fixed;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 420px;
  height: 70px;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
`;

const NavItem = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  color: ${props => props.active ? '#818cf8' : '#64748b'};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: ${props => props.active ? '600' : '400'};
  transition: all 0.3s;

  &:hover { color: #818cf8; transform: translateY(-2px); }
`;

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export const WelcomePage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) { console.error(error); }
  };

  const addTask = async () => {
    if (!taskInput.trim()) return;
    try {
      const response = await api.post('/tasks', { title: taskInput, completed: false });
      setTasks([response.data, ...tasks]);
      setTaskInput('');
    } catch (error) { alert("Erro ao salvar"); }
  };

  const toggleTask = async (task: Task) => {
    try {
      const newStatus = !task.completed;
      await api.patch(`/tasks/${task.id}`, { completed: newStatus });
      setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: newStatus } : t));
    } catch (error) { console.error(error); }
  };

  const deleteTask = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) { console.error(error); }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <ShellContainer>
      <ContentArea>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ color: 'white', fontSize: '2rem', margin: 0, fontWeight: 800 }}>Olá, Gabriel</h1>
            <p style={{ color: '#64748b', marginTop: '4px' }}>Vamos organizar seu dia?</p>
          </div>
          <button 
            onClick={() => { localStorage.removeItem('token'); window.location.href = '/'; }} 
            style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', padding: '10px', borderRadius: '14px', cursor: 'pointer' }}
          >
            <LogOut size={20} />
          </button>
        </header>

        <StatsGrid>
          <StatCard>
            <div style={{ background: 'rgba(129, 140, 248, 0.1)', padding: '10px', borderRadius: '12px' }}>
              <Clock color="#818cf8" size={24} />
            </div>
            <div>
              <h3>Pendentes</h3>
              <p>{pendingCount}</p>
            </div>
          </StatCard>
          <StatCard>
            <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '10px', borderRadius: '12px' }}>
              <CheckSquare color="#22c55e" size={24} />
            </div>
            <div>
              <h3>Concluídas</h3>
              <p>{completedCount}</p>
            </div>
          </StatCard>
        </StatsGrid>

        <div style={{ display: 'flex', gap: '12px', background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: '20px' }}>
          <Input 
            icon={Plus} 
            placeholder="O que precisa ser feito?" 
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            style={{ border: 'none', background: 'transparent' }}
          />
          <Button onClick={addTask} style={{ width: '120px', borderRadius: '14px' }}>Adicionar</Button>
        </div>

        <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h2 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LayoutDashboard size={18} color="#818cf8" /> Tarefas de Hoje
          </h2>
          
          {tasks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#475569' }}>
              <p>Tudo limpo por aqui! 🚀</p>
            </div>
          ) : (
            tasks.map(task => (
              <TaskCard key={task.id} completed={task.completed}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, cursor: 'pointer' }} onClick={() => toggleTask(task)}>
                  {task.completed ? <CheckCircle2 size={24} color="#22c55e" /> : <Circle size={24} color="#334155" />}
                  <span style={{ color: 'white', textDecoration: task.completed ? 'line-through' : 'none', opacity: task.completed ? 0.5 : 1 }}>
                    {task.title}
                  </span>
                </div>
                <button onClick={() => deleteTask(task.id)} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer' }}>
                  <Trash2 size={20} />
                </button>
              </TaskCard>
            ))
          )}
        </section>
      </ContentArea>

      <BottomNav>
        <NavItem active><Home size={26} />Início</NavItem>
        <NavItem><List size={26} />Tarefas</NavItem>
        <NavItem><Star size={26} />Favoritos</NavItem>
        <NavItem><User size={26} />Perfil</NavItem>
      </BottomNav>
    </ShellContainer>
  );
};