import { styled } from 'styled-components';
import './App.css';
import { Outlet } from 'react-router-dom';
import { Reset } from 'styled-reset';

function App() {
  return (
    <AppContent>
      <Reset />
      <Outlet />
    </AppContent>
  );
}

export default App;

const AppContent = styled.div`
  background-color: #cae9ff;
  width: 50%;
  height: 100vh;
  margin: 0 auto;
`;
