import './index.css'
import React from 'react'

import App from './App.tsx'
import ReactDOM from 'react-dom/client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from './components/Navbar.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <App />
      </QueryClientProvider> 
    </Router>
  </React.StrictMode>,
)
