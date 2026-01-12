import { Button } from '../components/Button';
import { Card } from '../components/Card';

export const WelcomePage = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload(); 
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      width: '100vw' 
    }}>
      <Card 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 style={{ textAlign: 'center', color: 'white' }}>Acesso Concedido! 🎉</h1>
        <p style={{ margin: '20px 0', color: '#94a3b8', textAlign: 'center' }}>
          Você está conectado ao Back-end. Seu Token JWT está ativo.
        </p>
        <Button onClick={handleLogout}>Sair do Sistema</Button>
      </Card>
    </div>
  );
};