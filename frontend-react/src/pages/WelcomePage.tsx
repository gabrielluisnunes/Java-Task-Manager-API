import { useState } from 'react';
import styled from 'styled-components';
import { 
  LogOut, Plus, CheckCircle2, Calendar, 
  Star, Home, List, User, Trash2, Circle 
} from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

// --- Estilos de Layout ---
const ShellContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  padding: 1.5rem 1.5rem 80px 1.5rem; 
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

// --- Navegação Inferior (Mobile First) ---
const BottomNav = styled.nav`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 400px;
  height: 65px;
  background: rgba(15, 23, 42, 0.8);
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
  text: string;
  completed: boolean;
}

export const WelcomePage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState('');

  const addTask = () => {
    if (!taskInput.trim()) return;
    const newTask = { id: Date.now(), text: taskInput, completed: false };
    setTasks([newTask, ...tasks]);
    setTaskInput('');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <ShellContainer>
      <ContentArea>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ color: 'white', fontSize: '1.8rem', margin: 0 }}>Minhas Tarefas</h2>
            <p style={{ color: '#94a3b8' }}>{tasks.filter(t => !t.completed).length} pendentes</p>
          </div>
          <button onClick={() => window.location.reload()} style={{ background: 'none', border: 'none', color: '#ef4444' }}>
            <LogOut size={20} />
          </button>
        </header>

        {/* Adicionar Tarefa */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <Input 
            icon={Plus} 
            placeholder="Nova tarefa..." 
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />
          <Button onClick={addTask} style={{ width: 'auto' }}>Add</Button>
        </div>

        {/* Lista de Tarefas */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {tasks.map(task => (
            <TaskCard key={task.id} completed={task.completed}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }} onClick={() => toggleTask(task.id)}>
                {task.completed ? 
                  <CheckCircle2 size={22} color="#22c55e" /> : 
                  <Circle size={22} color="#475569" />
                }
                <span style={{ 
                  color: 'white', 
                  textDecoration: task.completed ? 'line-through' : 'none' 
                }}>
                  {task.text}
                </span>
              </div>
              <button onClick={() => deleteTask(task.id)} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer' }}>
                <Trash2 size={18} />
              </button>
            </TaskCard>
          ))}
        </section>
      </ContentArea>

      {/* Barra de Navegação Estilo Mobile App */}
      <BottomNav>
        <NavItem active><Home size={24} />Início</NavItem>
        <NavItem><List size={24} />Tarefas</NavItem>
        <NavItem><Star size={24} />Favoritos</NavItem>
        <NavItem><User size={24} />Perfil</NavItem>
      </BottomNav>
    </ShellContainer>
  );
};