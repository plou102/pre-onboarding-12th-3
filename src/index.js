import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './pages/Main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: '<NotFound />',
    children: [
      {
        index: true,
        path: '/',
        element: <Main />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
