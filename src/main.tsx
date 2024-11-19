import './index.css';

import { createRoot } from 'react-dom/client';
import { NuqsAdapter } from 'nuqs/adapters/react-router'
import { BrowserRouter } from 'react-router-dom'
import React from 'react';

import { ThemeProvider } from './components/theme-provider';
import App from './App';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="__theme">
      <NuqsAdapter>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NuqsAdapter>
    </ThemeProvider>
  </React.StrictMode>
);