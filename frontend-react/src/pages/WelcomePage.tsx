import { useState } from 'react';
import styled from 'styled-components';
import { LogOut, Plus, CheckCircle2, Calendar, Star } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

const ShellContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background: transparent;
  padding: 2rem;
  box-sizing: border-box;
`;

const Header = styled.header`
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  
  h1 {
    font-size: 1.5rem;
    color: white;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const ContentArea = styled.main`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const QuickAddCard = styled.div`
  background: ${props => props.theme.colors.glass};
  backdrop-filter: blur(12px);
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 20px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
`;

export const WelcomePage = () => {
  const [taskName, setTaskName] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <ShellContainer>
      <Header>
        <h1><CheckCircle2 color="#6366f1" /> TaskManager</h1>
        <button 
          onClick={handleLogout}
          style={{ 
            background: 'rgba(239, 68, 68, 0.1)', 
            color: '#ef4444', 
            border: '1px solid rgba(239, 68, 68, 0.2)',
            padding: '8px 16px',
            borderRadius: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: '600'
          }}
        >
          <LogOut size={18} /> Sair
        </button>
      </Header>

      <ContentArea>
        {/* Seção 1: Saudação */}
        <section>
          <h2 style={{ color: 'white', fontSize: '2rem' }}>Olá! 👋</h2>
          <p style={{ color: '#94a3b8' }}>O que vamos realizar hoje?</p>
        </section>

        {/* Seção 2: Quick Add Task */}
        <QuickAddCard>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Input 
              icon={Plus} 
              placeholder="Digite uma nova tarefa..." 
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <Button style={{ width: 'auto', padding: '0 25px' }}>
              Adicionar
            </Button>
          </div>
          
          {/* Mini Filtros/Labels */}
          <div style={{ display: 'flex', gap: '15px', paddingLeft: '5px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#94a3b8', fontSize: '0.8rem', cursor: 'pointer' }}>
              <Calendar size={14} /> Hoje
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#94a3b8', fontSize: '0.8rem', cursor: 'pointer' }}>
              <Star size={14} /> Importante
            </span>
          </div>
        </QuickAddCard>

        {/* Aqui entrará a lista de tarefas no próximo passo */}
        <div style={{ textAlign: 'center', padding: '40px', color: '#475569', border: '2px dashed #334155', borderRadius: '20px' }}>
          Sua lista está vazia. Comece adicionando uma tarefa acima!
        </div>
      </ContentArea>
    </ShellContainer>
  );
};