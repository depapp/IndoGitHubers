// @ts-ignore
import './index.css'

import { NuqsAdapter } from 'nuqs/adapters/react-router'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ThemeProvider } from './components/theme-provider'

const domNode = document.getElementById('root') as HTMLElement

createRoot(domNode).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="__theme">
      <NuqsAdapter>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NuqsAdapter>
    </ThemeProvider>
  </React.StrictMode>,
)
