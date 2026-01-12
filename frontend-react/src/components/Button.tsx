import styled from 'styled-components';

export const Button = styled.button`
  width: 100%;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 14px 24px;
  border-radius: 12px;
  border: none;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }

  &:active {
    transform: translateY(0);
    transform: scale(0.98);
  }

  &:disabled {
    background-color: #475569;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;