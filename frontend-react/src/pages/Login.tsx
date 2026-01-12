import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { User, Lock, LogIn } from 'lucide-react';
import styled from 'styled-components';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import api from '../services/api';

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh; 
  width: 100vw;      
  padding: 1rem;     
  
  @media (max-width: 480px) {
    padding: 0.5rem;
  }
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
      window.location.href = '/dashboard'; 
    } catch (error) {
      alert("Falha no login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <Card initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '2rem' }}>Login</h2>
        <form onSubmit={handleLogin}>
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
            placeholder="Senha" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : <><LogIn size={18} /> Entrar</>}
          </Button>
        </form>
        <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#94a3b8' }}>
          Novo por aqui? <span 
            onClick={onSwitch} 
            style={{ color: '#6366f1', cursor: 'pointer', fontWeight: 'bold' }}
          >Crie sua conta</span>
        </p>
      </Card>
    </PageWrapper>
  );
};