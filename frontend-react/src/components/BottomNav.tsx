import styled from 'styled-components';
import { Home, List, Star, User } from 'lucide-react';

const NavContainer = styled.nav`
  position: fixed;
  bottom: 25px;
  width: 90%;
  max-width: 400px;
  height: 70px;
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.05);
  z-index: 1000;
`;

const NavItem = styled.div<{ active: boolean }>`
  color: ${props => props.active ? '#6366f1' : '#64748b'};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.2s;
  &:active { transform: scale(0.9); }
`;

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav = ({ activeTab, setActiveTab }: BottomNavProps) => {
  return (
    <NavContainer>
      <NavItem active={activeTab === 'inicio'} onClick={() => setActiveTab('inicio')}>
        <Home size={22} />
        <span style={{ fontSize: '0.65rem' }}>Início</span>
      </NavItem>
      <NavItem active={activeTab === 'tarefas'} onClick={() => setActiveTab('tarefas')}>
        <List size={22} />
        <span style={{ fontSize: '0.65rem' }}>Tarefas</span>
      </NavItem>
      <NavItem active={activeTab === 'favoritos'} onClick={() => setActiveTab('favoritos')}>
        <Star size={22} />
        <span style={{ fontSize: '0.65rem' }}>Favoritos</span>
      </NavItem>
      <NavItem active={activeTab === 'perfil'} onClick={() => setActiveTab('perfil')}>
        <User size={22} />
        <span style={{ fontSize: '0.65rem' }}>Perfil</span>
      </NavItem>
    </NavContainer>
  );
};