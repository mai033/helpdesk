import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/submit" element={<TicketForm />} />
          <Route path="/admin" element={<TicketList />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}


