import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { ApiError } from '../api';
import logoLaFEE from '/logo.png';
import './Admin.css';

export default function AdminLogin() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        try {
            await login(username, password);
            navigate('/admin');
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Erro ao entrar');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="admin-login-wrapper">
            <Card style={{ width: 360 }} className="p-4 shadow-sm">
                <img src={logoLaFEE} alt="LaFEE" className="admin-login-logo" />
                <h4 className="mb-3 text-center">Admin LaFEE</h4>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            autoComplete="username"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                        />
                    </Form.Group>
                    <Button type="submit" className="w-100" disabled={submitting}>
                        {submitting ? 'Entrando...' : 'Entrar'}
                    </Button>
                </Form>
                <div className="text-center mt-3 small">
                    Não tem conta? <Link to="/admin/register">Cadastrar</Link>
                </div>
            </Card>
        </div>
    );
}
