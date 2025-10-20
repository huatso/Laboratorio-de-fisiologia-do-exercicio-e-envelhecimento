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
    <div>
      <Header />
      <main className="main-content">
        {/* As páginas (Home, About, etc.) serão renderizadas aqui dentro */}
        <Outlet />
      </main>
      <Footer/>
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
      { path: '/members', element: <Members/> },
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