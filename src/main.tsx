import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles.css';
import './brand-logo.css';

const rawBase = import.meta.env.BASE_URL || '/';
const basename = rawBase === '/' ? undefined : rawBase.replace(/\/$/, '');

const redirectedPath = sessionStorage.getItem('afterdarkRedirect');
if (redirectedPath) {
  sessionStorage.removeItem('afterdarkRedirect');
  const base = basename || '';
  window.history.replaceState(null, '', base + redirectedPath);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
