import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${props => props.theme.colors.background};
    background-image: radial-gradient(at 0% 0%, #0f172a 0, transparent 50%), 
                      radial-gradient(at 50% 0%, #1e1b4b 0, transparent 50%), 
                      radial-gradient(at 100% 0%, #312e81 0, transparent 50%);
    color: ${props => props.theme.colors.text};
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
  }

  button, input {
    font-family: inherit;
  }
`;