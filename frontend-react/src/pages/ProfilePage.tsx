import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Trophy, CheckCircle, Clock, Award, Settings, ShieldCheck } from 'lucide-react';
import api from '../services/api';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 20px;
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const UserHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
`;

const Avatar = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.8rem;
  color: white;
  font-weight: 800;
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
  border: 4px solid #1e293b;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;
`;

const StatCard = styled.div<{ color: string }>`
  background: rgba(30, 41, 59, 0.5);
  padding: 1.5rem;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  svg { color: ${props => props.color}; }
  h3 { color: white; margin: 0; font-size: 1.5rem; }
  p { color: #64748b; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; }
`;

const AchievementSection = styled.div`
  background: rgba(30, 41, 59, 0.3);
  border-radius: 24px;
  padding: 1.5rem;
  
  h4 { color: white; margin-bottom: 1rem; display: flex; alignItems: center; gap: 8px; }
`;

const BadgeList = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 10px;
  &::-webkit-scrollbar { display: none; }
`;

const Badge = styled.div<{ locked?: boolean }>`
  min-width: 80px;
  height: 80px;
  background: ${props => props.locked ? '#1e293b' : 'rgba(99, 102, 241, 0.1)'};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  opacity: ${props => props.locked ? 0.4 : 1};
  border: 1px solid ${props => props.locked ? 'transparent' : '#6366f1'};

  span { font-size: 0.6rem; color: white; font-weight: bold; text-align: center; }
`;

export const ProfilePage = () => {
  const [userData, setUserData] = useState({ name: "Carregando...", email: "" });
  const [stats, setStats] = useState({ completed: 0, pending: 0 });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Supondo que você criou um endpoint /users/me no Spring Boot
        const userRes = await api.get('/users/me'); 
        const tasksRes = await api.get('/tasks');
        
        setUserData(userRes.data);
        setStats({
          completed: tasksRes.data.filter((t: any) => t.completed).length,
          pending: tasksRes.data.filter((t: any) => !t.completed).length
        });
      } catch (e) {
        console.error("Erro ao buscar perfil");
        setUserData({ name: "Gabriel Teste", email: "gabriel@exemplo.com" });
      }
    };
    fetchProfile();
  }, []);

  return (
    <ProfileContainer>
      <UserHeader>
        <Avatar>{userData.name[0]}</Avatar>
        <div>
          <h2 style={{ color: 'white', margin: 0 }}>{userData.name}</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{userData.email}</p>
        </div>
      </UserHeader>

      <StatsGrid>
        <StatCard color="#22c55e">
          <CheckCircle size={20} />
          <h3>{stats.completed}</h3>
          <p>Concluídas</p>
        </StatCard>
        <StatCard color="#6366f1">
          <Clock size={20} />
          <h3>{stats.pending}</h3>
          <p>Pendentes</p>
        </StatCard>
      </StatsGrid>

      <AchievementSection>
        <h4><Trophy size={18} color="#fbbf24" /> Conquistas</h4>
        <BadgeList>
          <Badge>
            <ShieldCheck size={24} color="#6366f1" />
            <span>Iniciante</span>
          </Badge>
          <Badge>
            <Award size={24} color="#fbbf24" />
            <span>Focado</span>
          </Badge>
          <Badge locked>
            <Trophy size={24} color="#94a3b8" />
            <span>Mestre</span>
          </Badge>
        </BadgeList>
      </AchievementSection>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button style={{ 
          background: 'rgba(255,255,255,0.03)', border: 'none', color: 'white', 
          padding: '15px', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '10px',
          textAlign: 'left', fontWeight: '600', cursor: 'pointer'
        }}>
          <Settings size={18} /> Configurações da Conta
        </button>
      </div>
    </ProfileContainer>
  );
};