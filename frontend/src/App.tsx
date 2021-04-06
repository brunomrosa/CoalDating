import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import Routes from './routes/index';

import { AuthProvider } from './context/AuthContext';
import GlobalStyle from './global/styles';
import 'antd/dist/antd.css';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <ToastContainer />
      <GlobalStyle />
    </Router>
  );
};

export default App;
