import { useState } from 'react';
import { User, Lock, Mail, UserPlus } from 'lucide-react';
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

export const RegisterPage = ({ onSwitch }: { onSwitch: () => void }) => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/register', formData);
      alert("Conta criada com sucesso! Faça seu login.");
      onSwitch();
    } catch (error) {
      alert("Erro ao cadastrar. Tente outro usuário.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <Card initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '2rem' }}>Cadastro</h2>
        <form onSubmit={handleRegister}>
          <Input 
            icon={User} 
            placeholder="Username" 
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            required 
          />
          <Input 
            icon={Mail} 
            type="email" 
            placeholder="E-mail" 
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required 
          />
          <Input 
            icon={Lock} 
            type="password" 
            placeholder="Senha" 
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required 
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Cadastrando...' : <><UserPlus size={18} /> Criar Conta</>}
          </Button>
        </form>
        <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#94a3b8' }}>
          Já tem conta? <span 
            onClick={onSwitch} 
            style={{ color: '#6366f1', cursor: 'pointer', fontWeight: 'bold' }}
          >Fazer Login</span>
        </p>
      </Card>
    </PageWrapper>
  );
};