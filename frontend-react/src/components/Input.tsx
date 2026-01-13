import styled from 'styled-components';
import { type LucideIcon } from 'lucide-react';

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%; 
  background: ${props => props.theme.colors.glass};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 0 16px; 
  transition: all 0.3s ease;
  box-sizing: border-box; // Fundamental para não vazar

  &:focus-within {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const StyledInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  padding: 14px 12px;
  color: white;
  font-size: 1rem;
  outline: none;
  width: 100%; // Garante preenchimento total

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
}

export const Input = ({ icon: Icon, ...props }: InputProps) => (
  <InputWrapper>
    <Icon size={20} style={{ color: '#64748b', flexShrink: 0 }} />
    <StyledInput {...props} />
  </InputWrapper>
);