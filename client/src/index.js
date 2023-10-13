import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import { NotesProvider } from './Store/Context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <React.StrictMode>
  <NotesProvider >

    <App />
    </NotesProvider  >

  </React.StrictMode>
  </BrowserRouter>

);