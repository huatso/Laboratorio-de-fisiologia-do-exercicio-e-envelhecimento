//PascalCase for convention 

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';


// Caminhos para o Header
import Header from './components/Header'; 
import Home from './pages/Home';
import About from './pages/About';
import Research from './pages/Research';
import Members from './pages/Members';
import Publication from './pages/Publication';
import Resources from './pages/Resources';
import Footer from './components/Footer';

import './index.css';


// Componente de Layout (a "casca" do site)
const AppLayout = () => {
  return (
    // 1. Mude o <div className="app-layout"> para um fragmento <>
    <>
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
    // 2. Feche o fragmento </>
  );
};

// Configuração do roteador
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      // A rota '/' agora carrega 'About'
      { path: '/', element: <About /> }, 
      { path: '/about', element: <About /> }, // 'about' também carrega 'About'
      { path: '/members', element: <Members /> }, // Mudando para a nova ordem
      { path: '/research', element: <Research /> },
      { path: '/publication', element: <Publication /> },
      { path: '/resources', element: <Resources /> },
    ],
  },
]);

// Renderiza a aplicação com as rotas configuradas
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);