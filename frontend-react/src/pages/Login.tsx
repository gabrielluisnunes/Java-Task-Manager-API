import { useState } from 'react';
import { User, Lock, LogIn } from 'lucide-react';
import styled from 'styled-components';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import api from '../services/api';

const LayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const LoginPage = ({ onSwitch }: { onSwitch: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      window.location.reload();
    } catch (error) {
      alert("Credenciais incorretas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutContainer>
      <Card 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }}
        style={{ width: '100%', maxWidth: '400px' }} 
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2.2rem', color: '#fff', fontWeight: 800, margin: 0 }}>Entrar</h2>
          <p style={{ color: '#94a3b8', marginTop: '10px' }}>Acesse sua conta para continuar</p>
        </div>

        <StyledForm onSubmit={handleLogin}>
          <Input 
            icon={User} 
            placeholder="Nome de usuário" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input 
            icon={Lock} 
            type="password" 
            placeholder="Sua senha" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Processando...' : <><LogIn size={18} /> Acessar Sistema</>}
          </Button>
        </StyledForm>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', width: '100%' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Novo por aqui? </span>
          <button 
            onClick={onSwitch}
            style={{ background: 'none', border: 'none', color: '#6366f1', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}
          >
            Crie sua conta
          </button>
        </div>
      </Card>
    </LayoutContainer>
  );
};