import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles'; 
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';


const DashboardPlaceholder = () => (
  <div style={{ padding: '40px', textAlign: 'center' }}>
    <h1 style={{ color: 'white' }}>🚀 Bem-vindo ao Dashboard do seu SaaS!</h1>
    <button 
      onClick={() => { localStorage.removeItem('token'); window.location.reload(); }}
      style={{ marginTop: '20px', color: '#ef4444', cursor: 'pointer', background: 'none', border: '1px solid #ef4444', padding: '10px', borderRadius: '8px' }}
    >
      Sair do Sistema
    </button>
  </div>
);

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [currentScreen, setCurrentScreen] = useState<'login' | 'register'>('login');

  // Verifica se o usuário está logado
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) setToken(savedToken);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {}
      <GlobalStyles />
      
      {!token ? (
        currentScreen === 'login' ? (
          <LoginPage onSwitch={() => setCurrentScreen('register')} />
        ) : (
          <RegisterPage onSwitch={() => setCurrentScreen('login')} />
        )
      ) : (
        
        <DashboardPlaceholder />
      )}
    </ThemeProvider>
  );
}

export default App;