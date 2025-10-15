import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// 1. Import the Link component
import { Link } from 'react-router-dom';

// Import your custom CSS
import './Header.css';

function Header() {
  return (
    <Navbar expand="lg" className="custom-navbar" sticky="top" variant="dark">
      <Container fluid className="px-4">
        {/* 2. Update Navbar.Brand */}
        <Navbar.Brand id = "logo" as={Link} to="/">
          <img
            src="/logo.png"
            alt="LAFEE Logo"
            className="d-inline-block align-top logo-img"
          />
        </Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* 3. Update all Nav.Link components */}
            <Nav.Link as={Link} to="/">Início</Nav.Link>
            <Nav.Link as={Link} to="/research">Pesquisa</Nav.Link>
            <Nav.Link as={Link} to="/publication">Publicações</Nav.Link>
            <Nav.Link as={Link} to="/members">Equipe</Nav.Link>
            <Nav.Link as={Link} to="/resources">Recursos</Nav.Link>
            <Nav.Link as={Link} to="/about">Sobre</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
