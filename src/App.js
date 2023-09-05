import { styled } from 'styled-components';
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <MainContent>
      <Outlet />
    </MainContent>
  );
}

export default App;

const MainContent = styled.div`
  background-color: #cae9ff;
`;
