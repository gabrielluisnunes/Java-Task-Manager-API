import { useState } from 'react';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import styled from 'styled-components';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import api from '../services/api';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const RegisterPage = ({ onSwitch }: { onSwitch: () => void }) => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/register', formData);
      alert("Sucesso! Agora faça o login.");
      onSwitch();
    } catch (error) {
      alert("Erro ao cadastrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Card 
        initial={{ opacity: 0, x: 20 }} 
        animate={{ opacity: 1, x: 0 }}
        style={{ width: '100%', maxWidth: '400px' }} 
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', color: '#fff', fontWeight: 800, margin: 0 }}>Novo Cadastro</h2>
          <p style={{ color: '#94a3b8', marginTop: '10px' }}>Crie sua conta em poucos segundos</p>
        </div>

        <Form onSubmit={handleRegister}>
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
          <Button type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Cadastrando...' : <><UserPlus size={18} /> Criar Conta</>}
          </Button>
        </Form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <span style={{ color: '#94a3b8' }}>Já tem uma conta? </span>
          <button 
            onClick={onSwitch}
            style={{ background: 'none', border: 'none', color: '#6366f1', fontWeight: 700, cursor: 'pointer' }}
          >
            Fazer login
          </button>
        </div>
      </Card>
    </PageContainer>
  );
};