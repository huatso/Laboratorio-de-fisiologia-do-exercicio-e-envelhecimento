import { useEffect, useState } from 'react';
import { Alert, Button, Form, Modal, Spinner, Table } from 'react-bootstrap';
import * as api from '../api';
import type { ApiResource } from '../types/api';

const emptyForm: Partial<ApiResource> = {
    title: '', description: '', download_url: '', upload_year_month: '', tag: '',
};

export default function AdminResources() {
    const [resources, setResources] = useState<ApiResource[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<ApiResource | null>(null);
    const [form, setForm] = useState<Partial<ApiResource>>(emptyForm);
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);

    const load = () => {
        setLoading(true);
        api.getResources().then(setResources).catch(() => setError('Erro ao carregar recursos')).finally(() => setLoading(false));
    };

    useEffect(load, []);

    const openCreate = () => {
        setEditing(null);
        setForm(emptyForm);
        setUploadFile(null);
        setShowModal(true);
    };

    const openEdit = (resource: ApiResource) => {
        setEditing(resource);
        setForm(resource);
        setUploadFile(null);
        setShowModal(true);
    };

    const handleSave = async () => {
        setSaving(true);
        setError(null);
        try {
            let downloadUrl = form.download_url ?? null;
            if (uploadFile) {
                const oldKey = editing?.download_url?.startsWith('/files/') ? editing.download_url.slice('/files/'.length) : undefined;
                const uploaded = await api.uploadFile(uploadFile, 'resources', oldKey);
                downloadUrl = uploaded.url;
            }
            const payload = { ...form, download_url: downloadUrl };
            if (editing) {
                await api.updateResource(editing.id, payload);
            } else {
                await api.createResource(payload);
            }
            setShowModal(false);
            load();
        } catch {
            setError('Erro ao salvar recurso');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (resource: ApiResource) => {
        if (!confirm(`Deletar "${resource.title}"?`)) return;
        try {
            await api.deleteResource(resource.id);
            load();
        } catch {
            setError('Erro ao deletar recurso');
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Recursos</h2>
                <Button onClick={openCreate}>+ Novo Recurso</Button>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            {loading ? (
                <Spinner animation="border" role="status" />
            ) : (
                <Table striped hover responsive>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Tag</th>
                            <th>Upload</th>
                            <th>Link</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {resources.map(r => (
                            <tr key={r.id}>
                                <td>{r.title}</td>
                                <td>{r.tag}</td>
                                <td>{r.upload_year_month}</td>
                                <td>{r.download_url ? <a href={r.download_url} target="_blank" rel="noreferrer">abrir</a> : <span className="text-danger">sem link</span>}</td>
                                <td className="text-end">
                                    <Button size="sm" variant="outline-secondary" className="me-2" onClick={() => openEdit(r)}>Editar</Button>
                                    <Button size="sm" variant="outline-danger" onClick={() => handleDelete(r)}>Deletar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{editing ? 'Editar Recurso' : 'Novo Recurso'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2">
                            <Form.Label>Título</Form.Label>
                            <Form.Control value={form.title ?? ''} onChange={e => setForm({ ...form, title: e.target.value })} required />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control as="textarea" rows={2} value={form.description ?? ''} onChange={e => setForm({ ...form, description: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Mês/Ano de upload (ex: 2025-09)</Form.Label>
                            <Form.Control value={form.upload_year_month ?? ''} onChange={e => setForm({ ...form, upload_year_month: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Tag / Categoria</Form.Label>
                            <Form.Control value={form.tag ?? ''} onChange={e => setForm({ ...form, tag: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Arquivo {form.download_url && <span className="text-muted small">(atual: {form.download_url})</span>}</Form.Label>
                            <Form.Control type="file" onChange={e => setUploadFile((e.target as HTMLInputElement).files?.[0] ?? null)} />
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
