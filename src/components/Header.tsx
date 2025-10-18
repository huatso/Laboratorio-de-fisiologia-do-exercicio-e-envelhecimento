import { useState } from 'react';
import './Header.css';
import logoLaFEE from '/logo_vertical.png'; 

const Header = () => {
  // Estado para controlar a abertura/fechamento do menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lista de links para facilitar a manutenção
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Sobre', path: '/about' },
    { name: 'Pesquisas', path: '/research' },
    { name: 'Membros', path: '/members' },
    { name: 'Publicações', path: '/publication' },
    { name: 'Recursos', path: '/resources' },
  ];

  return (
    <header className="header-container">
      <div className="header-content">
        {/* Logo */}
        <a href="/" className="logo-link">
          <img src={logoLaFEE} alt="Logo LaFEE" className="logo-image" />
        </a>

        {/* Navegação para Desktop */}
        <nav className="nav-desktop">
          <ul>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.path}>{link.name}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Botão de Menu Mobile (Hambúrguer) */}
        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir menu"
        >
          &#9776; {/* Ícone de hambúrguer */}
        </button>
      </div>

      {/* Navegação Mobile (aparece quando o menu está aberto) */}
      {isMenuOpen && (
        <nav className="nav-mobile">
          <ul>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.path} onClick={() => setIsMenuOpen(false)}>{link.name}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;