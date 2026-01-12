import styled from 'styled-components';
import { type LucideIcon } from 'lucide-react';

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
`;

const StyledInput = styled.input`
  width: 100%;
  background: ${props => props.theme.colors.glass};
  border: 1px solid ${props => props.theme.colors.border};
  padding: 12px 12px 12px 40px;
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
    background: rgba(255, 255, 255, 0.07);
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.textSecondary};
  display: flex;
  align-items: center;
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
}

export const Input = ({ icon: Icon, ...props }: InputProps) => (
  <InputContainer>
    {Icon && <IconWrapper><Icon size={18} /></IconWrapper>}
    <StyledInput {...props} />
  </InputContainer>
);