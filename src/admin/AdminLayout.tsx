import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Button, Container, Nav } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import logoLaFEE from '/logo.png';
import './Admin.css';

export default function AdminLayout() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    return (
        <div className="admin-layout d-flex">
            <aside className="admin-sidebar">
                <div className="admin-sidebar-brand">
                    <img src={logoLaFEE} alt="LaFEE" className="admin-sidebar-logo" />
                    <h5 className="admin-sidebar-title">LaFEE Admin</h5>
                </div>
                <Nav className="flex-column">
                    <Nav.Link as={NavLink} to="/admin" end>Dashboard</Nav.Link>
                    <Nav.Link as={NavLink} to="/admin/members">Membros</Nav.Link>
                    <Nav.Link as={NavLink} to="/admin/resources">Recursos</Nav.Link>
                    <Nav.Link as={NavLink} to="/admin/publications">Publicações</Nav.Link>
                </Nav>
                <Button variant="outline-light" size="sm" className="mt-4 admin-sidebar-logout" onClick={handleLogout}>
                    Sair
                </Button>
            </aside>
            <main className="admin-content flex-grow-1">
                <Container fluid className="p-4">
                    <Outlet />
                </Container>
            </main>
        </div>
    );
}
