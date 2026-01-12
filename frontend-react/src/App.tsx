import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles'; 
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import { WelcomePage } from './pages/WelcomePage'; 

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [currentScreen, setCurrentScreen] = useState<'login' | 'register'>('login');


  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      
      {!token ? (
        currentScreen === 'login' ? (
          <LoginPage onSwitch={() => setCurrentScreen('register')} />
        ) : (
          <RegisterPage onSwitch={() => setCurrentScreen('login')} />
        )
      ) : (
        <WelcomePage />
      )}
    </ThemeProvider>
  );
}

export default App;