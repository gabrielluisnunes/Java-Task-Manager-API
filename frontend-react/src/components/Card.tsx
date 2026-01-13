import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Card = styled(motion.div)`
  background: rgba(15, 23, 42, 0.6); 
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1); // Borda sutil
  border-radius: 28px;
  padding: 3rem 2.5rem;
  width: 100%;
  max-width: 440px; 
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
    max-width: 90%; 
  }
`;