import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import  { ThemeProvider } from 'styled-components';
import App from './App';
import HomePage from "./pages/HomePage.tsx";

const theme = {
  primary: '#3f51b5',
  secondary: '#f50057',
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <HomePage />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);