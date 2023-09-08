import { styled } from 'styled-components';
import './App.css';
import { Outlet } from 'react-router-dom';
import { Reset } from 'styled-reset';
import { KeywordProvider } from 'context/KeywordContext';
import { ListProvider } from 'context/ListContext';
import React from 'react';

const AppProvider = ({ contexts, children }) =>
  contexts.reduce(
    (prev, context) =>
      React.createElement(context, {
        children: prev,
      }),
    children,
  );

function App() {
  return (
    <AppContent>
      <AppProvider contexts={[ListProvider, KeywordProvider]}>
        <Reset />
        <Outlet />
      </AppProvider>
    </AppContent>
  );
}

export default App;

const AppContent = styled.div`
  background-color: #cae9ff;
  width: 50%;
  height: 100vh;
  margin: 0 auto;
  padding-top: 3rem;
`;
