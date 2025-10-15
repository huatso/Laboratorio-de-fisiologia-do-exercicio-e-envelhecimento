import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './Home.tsx'
import Members from "./Members.tsx"
import Resources from "./Resources.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<Members />}/>
        <Route path="/resources" element={<Resources />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

