import { useEffect, useState } from 'react';
import { Alert, Button, Form, Modal, Spinner, Table } from 'react-bootstrap';
import * as api from '../api';
import { ApiError } from '../api';
import type { ApiPublication } from '../types/api';

const emptyForm: Partial<ApiPublication> = { bibtex_key: '', bibtex_raw: '' };

export default function AdminPublications() {
    const [publications, setPublications] = useState<ApiPublication[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<ApiPublication | null>(null);
    const [form, setForm] = useState<Partial<ApiPublication>>(emptyForm);
    const [saving, setSaving] = useState(false);

    const load = () => {
        setLoading(true);
        api.getPublications().then(setPublications).catch(() => setError('Erro ao carregar publicações')).finally(() => setLoading(false));
    };

    useEffect(load, []);

    const openCreate = () => {
        setEditing(null);
        setForm(emptyForm);
        setShowModal(true);
    };

    const openEdit = (publication: ApiPublication) => {
        setEditing(publication);
        setForm(publication);
        setShowModal(true);
    };

    const handleSave = async () => {
        setSaving(true);
        setError(null);
        try {
            if (editing) {
                await api.updatePublication(editing.id, form);
            } else {
                await api.createPublication(form);
            }
            setShowModal(false);
            load();
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Erro ao salvar publicação');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (publication: ApiPublication) => {
        if (!confirm(`Deletar "${publication.bibtex_key}"?`)) return;
        try {
            await api.deletePublication(publication.id);
            load();
        } catch {
            setError('Erro ao deletar publicação');
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Publicações</h2>
                <Button onClick={openCreate}>+ Nova Publicação</Button>
            </div>

            <Alert variant="info" className="small">
                Cole a entrada BibTeX completa (formato <code>@article{'{'}Chave, campo = {'{'}valor{'}'}, ...{'}'}</code>).
            </Alert>

            {error && <Alert variant="danger">{error}</Alert>}

            {loading ? (
                <Spinner animation="border" role="status" />
            ) : (
                <Table striped hover responsive>
                    <thead>
                        <tr>
                            <th>Chave BibTeX</th>
                            <th>Prévia</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {publications.map(p => (
                            <tr key={p.id}>
                                <td>{p.bibtex_key}</td>
                                <td className="text-muted small">{p.bibtex_raw.slice(0, 80)}...</td>
                                <td className="text-end">
                                    <Button size="sm" variant="outline-secondary" className="me-2" onClick={() => openEdit(p)}>Editar</Button>
                                    <Button size="sm" variant="outline-danger" onClick={() => handleDelete(p)}>Deletar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{editing ? 'Editar Publicação' : 'Nova Publicação'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2">
                            <Form.Label>Chave BibTeX (ex: Pontes2024)</Form.Label>
                            <Form.Control value={form.bibtex_key ?? ''} onChange={e => setForm({ ...form, bibtex_key: e.target.value })} required />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Entrada BibTeX completa</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={12}
                                style={{ fontFamily: 'monospace', fontSize: '0.85em' }}
                                value={form.bibtex_raw ?? ''}
                                onChange={e => setForm({ ...form, bibtex_raw: e.target.value })}
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
                    <Button onClick={handleSave} disabled={saving}>{saving ? 'Salvando...' : 'Salvar'}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
