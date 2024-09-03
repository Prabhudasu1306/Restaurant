// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App'; // Ensure the path to App.js is correct
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS globally

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider> {/* Wrap the entire app with AuthProvider */}
    <Router>      {/* Router should wrap around the whole app once, here */}
      <App />
    </Router>
  </AuthProvider>
);
