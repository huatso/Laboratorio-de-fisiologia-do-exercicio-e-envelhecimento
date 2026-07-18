import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { ApiError } from '../api';
import logoLaFEE from '/logo.png';
import './Admin.css';

export default function AdminRegister() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirm) {
            setError('Senhas não conferem');
            return;
        }
        if (password.length < 6) {
            setError('Senha deve ter pelo menos 6 caracteres');
            return;
        }
        if (username.length < 3) {
            setError('Usuário deve ter pelo menos 3 caracteres');
            return;
        }

        setSubmitting(true);
        try {
            await register(username, password);
            navigate('/admin');
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Erro ao cadastrar');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="admin-login-wrapper">
            <Card style={{ width: 360 }} className="p-4 shadow-sm">
                <img src={logoLaFEE} alt="LaFEE" className="admin-login-logo" />
                <h4 className="mb-3 text-center">Criar Conta</h4>
                <p className="text-muted small text-center mb-3">
                    O primeiro usuário cadastrado vira administrador.
                </p>
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
                            autoComplete="new-password"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Confirmar Senha</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirm}
                            onChange={e => setConfirm(e.target.value)}
                            autoComplete="new-password"
                            required
                        />
                    </Form.Group>
                    <Button type="submit" className="w-100" disabled={submitting}>
                        {submitting ? 'Cadastrando...' : 'Cadastrar'}
                    </Button>
                </Form>
                <div className="text-center mt-3 small">
                    Já tem conta? <Link to="/admin/login">Entrar</Link>
                </div>
            </Card>
        </div>
    );
}
