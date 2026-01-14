import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CheckCircle2, Circle, Clock, TrendingUp } from 'lucide-react';
import api from '../services/api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const ProgressCard = styled.div`
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  border-radius: 24px;
  padding: 1.5rem;
  color: white;
  box-shadow: 0 10px 20px rgba(99, 102, 241, 0.2);
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  margin-top: 12px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div<{ width: number }>`
  width: ${props => props.width}%;
  height: 100%;
  background: #fff;
  transition: width 0.5s ease-out;
`;

const SectionTitle = styled.h2`
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PendingTaskCard = styled.div`
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 18px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
`;

export const InicioContent = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [userName, setUserName] = useState("Gabriel"); 

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await api.get('/tasks');
        setTasks(response.data);
      } catch (error) { console.error(error); }
    };
    loadTasks();
  }, []);

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingTasks = tasks.filter(t => !t.completed);
  const totalTasks = tasks.length;
  const progressPercent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return (
    <Container>
      <header>
        <p style={{ color: '#64748b', margin: 0 }}>Olá, {userName} 👋</p>
        <h1 style={{ color: 'white', fontSize: '1.6rem', margin: 0, fontWeight: 800 }}>Sua Visão Geral</h1>
      </header>

      <ProgressCard>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '0.9rem' }}>Progresso Diário</p>
            <h3 style={{ margin: '5px 0', fontSize: '1.4rem' }}>{progressPercent}% concluído</h3>
          </div>
          <TrendingUp size={32} />
        </div>
        <ProgressBarContainer>
          <ProgressBarFill width={progressPercent} />
        </ProgressBarContainer>
        <p style={{ margin: '10px 0 0', fontSize: '0.75rem', opacity: 0.8 }}>
          {completedCount} de {totalTasks} tarefas finalizadas
        </p>
      </ProgressCard>

      <section>
        <SectionTitle>
          <Clock size={18} color="#f59e0b" /> Tarefas Pendentes
        </SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
          {pendingTasks.length > 0 ? (
            pendingTasks.map(task => (
              <PendingTaskCard key={task.id}>
                <Circle size={20} color="#334155" />
                <span style={{ fontSize: '0.9rem' }}>{task.title}</span>
              </PendingTaskCard>
            ))
          ) : (
            <p style={{ color: '#64748b', textAlign: 'center' }}>Tudo limpo por aqui! 🎉</p>
          )}
        </div>
      </section>
    </Container>
  );
};