import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  LogOut, Plus, CheckCircle2, Star, Home, List, 
  User, Trash2, Circle, Calendar as CalendarIcon 
} from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import api from '../services/api';

// --- Styled Components Responsivos ---
const ShellContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background: #0f172a;
  padding: 1.5rem 1rem 120px 1rem; 
  box-sizing: border-box;
`;

const ContentArea = styled.main`
  width: 100%;
  max-width: 480px; 
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PriorityBadge = styled.span<{ level: string }>`
  font-size: 0.65rem;
  padding: 3px 10px;
  border-radius: 8px;
  font-weight: 800;
  background: ${props => 
    props.level === 'HIGH' ? 'rgba(239, 68, 68, 0.2)' : 
    props.level === 'MEDIUM' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(34, 197, 94, 0.2)'};
  color: ${props => 
    props.level === 'HIGH' ? '#f87171' : 
    props.level === 'MEDIUM' ? '#fbbf24' : '#4ade80'};
`;

const TaskCard = styled.div<{ completed: boolean }>`
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid ${props => props.completed ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255, 255, 255, 0.05)'};
  border-radius: 22px;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DateInput = styled.input`
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 8px 12px;
  color: white;
  font-size: 0.8rem;
  outline: none;
  &::-webkit-calendar-picker-indicator { filter: invert(1); cursor: pointer; }
`;

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate: string;
}

export const WelcomePage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState('');
  const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('LOW');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => { loadTasks(); }, []);

  const loadTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) { console.error(error); }
  };

  const addTask = async () => {
    if (!taskInput.trim()) return;
    try {
      const response = await api.post('/tasks', { 
        title: taskInput, 
        priority: priority,
        completed: false,
        dueDate: dueDate // Enviando a data selecionada no input
      });
      setTasks([response.data, ...tasks]);
      setTaskInput('');
    } catch (error) { alert("Erro ao salvar tarefa."); }
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

  // Função para formatar a data de forma segura
  const formatDate = (dateString: string) => {
    if (!dateString) return "Sem data";
    const date = new Date(dateString);
    // Adiciona o offset do timezone para evitar que a data mude para o dia anterior
    const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    return isNaN(adjustedDate.getTime()) ? "Data Inválida" : adjustedDate.toLocaleDateString('pt-BR');
  };

  const translatePriority = (p: string) => {
    if (p === 'HIGH') return 'ALTA';
    if (p === 'MEDIUM') return 'MÉDIA';
    return 'BAIXA';
  };

  return (
    <ShellContainer>
      <ContentArea>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 800 }}>Minha Rotina</h1>
          <button onClick={() => { localStorage.removeItem('token'); window.location.href='/'; }} 
            style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', padding: '8px', borderRadius: '10px' }}>
            <LogOut size={18} />
          </button>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '28px' }}>
          <Input 
            icon={Plus} 
            placeholder="O que vamos realizar?" 
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => setPriority('LOW')} style={{ padding: '6px 12px', borderRadius: '10px', border: 'none', fontSize: '0.65rem', background: priority === 'LOW' ? '#22c55e' : '#1e293b', color: 'white', fontWeight: 'bold' }}>BAIXA</button>
              <button onClick={() => setPriority('MEDIUM')} style={{ padding: '6px 12px', borderRadius: '10px', border: 'none', fontSize: '0.65rem', background: priority === 'MEDIUM' ? '#f59e0b' : '#1e293b', color: 'white', fontWeight: 'bold' }}>MÉDIA</button>
              <button onClick={() => setPriority('HIGH')} style={{ padding: '6px 12px', borderRadius: '10px', border: 'none', fontSize: '0.65rem', background: priority === 'HIGH' ? '#ef4444' : '#1e293b', color: 'white', fontWeight: 'bold' }}>ALTA</button>
            </div>
            
            <DateInput 
              type="date" 
              value={dueDate} 
              onChange={(e) => setDueDate(e.target.value)} 
            />
          </div>

          <Button onClick={addTask} style={{ borderRadius: '14px', height: '45px' }}>Criar Tarefa</Button>
        </div>

        <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {tasks.map(task => (
            <TaskCard key={task.id} completed={task.completed}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '14px', flex: 1 }} onClick={() => toggleTask(task)}>
                  <div style={{ marginTop: '3px' }}>
                    {task.completed ? <CheckCircle2 size={24} color="#22c55e" /> : <Circle size={24} color="#334155" />}
                  </div>
                  <div>
                    <p style={{ color: 'white', margin: 0, fontSize: '0.95rem', textDecoration: task.completed ? 'line-through' : 'none', opacity: task.completed ? 0.5 : 1 }}>
                      {task.title}
                    </p>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '8px', alignItems: 'center' }}>
                      <PriorityBadge level={task.priority}>{translatePriority(task.priority)}</PriorityBadge>
                      <span style={{ color: '#64748b', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CalendarIcon size={14} /> {formatDate(task.dueDate)}
                      </span>
                    </div>
                  </div>
                </div>
                <button onClick={() => deleteTask(task.id)} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer' }}>
                  <Trash2 size={18} />
                </button>
              </div>
            </TaskCard>
          ))}
        </section>
      </ContentArea>

      <nav style={{ position: 'fixed', bottom: '25px', width: '90%', maxWidth: '400px', height: '70px', background: 'rgba(30, 41, 59, 0.95)', backdropFilter: 'blur(10px)', borderRadius: '25px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ color: '#6366f1', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}><Home size={22} /><span style={{fontSize: '0.65rem', fontWeight: 700}}>Início</span></div>
        <div style={{ color: '#64748b', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}><List size={22} /><span style={{fontSize: '0.65rem'}}>Tarefas</span></div>
        <div style={{ color: '#64748b', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}><Star size={22} /><span style={{fontSize: '0.65rem'}}>Favoritos</span></div>
        <div style={{ color: '#64748b', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}><User size={22} /><span style={{fontSize: '0.65rem'}}>Perfil</span></div>
      </nav>
    </ShellContainer>
  );
};