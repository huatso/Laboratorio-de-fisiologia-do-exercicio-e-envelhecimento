import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home.tsx'
import Members from "./pages/Members.tsx"
import Resources from "./pages/Resources.tsx"
import About from "./pages/About.tsx"
import Research from "./pages/Research.tsx"
import Publication from "./pages/Publication.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<Members />}/>
        <Route path="/resources" element={<Resources />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/research" element={<Research />}/>
        <Route path="/publication" element={<Publication />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

