import React from 'react';
import './Footer.css';
// Importe o seu logo. O caminho pode precisar de ajuste.
import logoLaFEE from '/logo.png'; 

const Footer = () => {
  // Pega o ano atual dinamicamente
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-text">
          <p>
            © {currentYear} Todos os direitos reservados.
          </p>
          <p>
            Laboratório de Fisiologia do Exercício e Envelhecimento (LaFEE)
          </p>
          <p>
            Escola de Artes, Ciências e Humanidades (EACH) | Universidade de São Paulo (USP)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;