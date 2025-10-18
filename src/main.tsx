import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';


// Caminhos para o Header
import Header from './components/Header.tsx'; 
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Research from './pages/Research.tsx';
import Members from './pages/Members.tsx';
import Publication from './pages/Publication.tsx';
import Resources from './pages/Resources.tsx';

import './index.css';


// Componente de Layout (a "casca" do site)
const AppLayout = () => {
  return (
    <div>
      <Header />
      <main className="main-content">
        {/* As páginas (Home, About, etc.) serão renderizadas aqui dentro */}
        <Outlet />
      </main>
      {/* Adicionar Footer */}
    </div>
  );
};

// Configuração do roteador
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />, // O layout principal é o elemento raiz
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/research', element: <Research /> },
      { path: '/members', element: <Members /> },
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