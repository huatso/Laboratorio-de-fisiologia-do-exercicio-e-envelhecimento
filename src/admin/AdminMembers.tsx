import { useEffect, useState } from 'react';
import { Alert, Button, Form, Modal, Spinner, Table } from 'react-bootstrap';
import * as api from '../api';
import type { ApiMember } from '../types/api';

const emptyForm: Partial<ApiMember> = {
    name: '', subtitle: '', teaser: '', bio: '', location: '', links: '', image_url: '', sort_order: 0,
};

export default function AdminMembers() {
    const [members, setMembers] = useState<ApiMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<ApiMember | null>(null);
    const [form, setForm] = useState<Partial<ApiMember>>(emptyForm);
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);

    const load = () => {
        setLoading(true);
        api.getMembers().then(setMembers).catch(() => setError('Erro ao carregar membros')).finally(() => setLoading(false));
    };

    useEffect(load, []);

    const openCreate = () => {
        setEditing(null);
        setForm(emptyForm);
        setPhotoFile(null);
        setShowModal(true);
    };

    const openEdit = (member: ApiMember) => {
        setEditing(member);
        setForm(member);
        setPhotoFile(null);
        setShowModal(true);
    };

    const handleSave = async () => {
        setSaving(true);
        setError(null);
        try {
            let imageUrl = form.image_url ?? null;
            if (photoFile) {
                const oldKey = editing?.image_url?.startsWith('/files/') ? editing.image_url.slice('/files/'.length) : undefined;
                const uploaded = await api.uploadFile(photoFile, 'members', oldKey);
                imageUrl = uploaded.url;
            }
            const payload = { ...form, image_url: imageUrl };
            if (editing) {
                await api.updateMember(editing.id, payload);
            } else {
                await api.createMember(payload);
            }
            setShowModal(false);
            load();
        } catch {
            setError('Erro ao salvar membro');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (member: ApiMember) => {
        if (!confirm(`Deletar "${member.name}"?`)) return;
        try {
            await api.deleteMember(member.id);
            load();
        } catch {
            setError('Erro ao deletar membro');
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Membros</h2>
                <Button onClick={openCreate}>+ Novo Membro</Button>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            {loading ? (
                <Spinner animation="border" role="status" />
            ) : (
                <Table striped hover responsive>
                    <thead>
                        <tr>
                            <th>Foto</th>
                            <th>Nome</th>
                            <th>Cargo</th>
                            <th>Local</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map(m => (
                            <tr key={m.id}>
                                <td>
                                    {m.image_url && <img src={m.image_url} alt={m.name} width={40} height={40} style={{ objectFit: 'cover', borderRadius: '50%' }} />}
                                </td>
                                <td>{m.name}</td>
                                <td>{m.subtitle}</td>
                                <td>{m.location}</td>
                                <td className="text-end">
                                    <Button size="sm" variant="outline-secondary" className="me-2" onClick={() => openEdit(m)}>Editar</Button>
                                    <Button size="sm" variant="outline-danger" onClick={() => handleDelete(m)}>Deletar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{editing ? 'Editar Membro' : 'Novo Membro'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control value={form.name ?? ''} onChange={e => setForm({ ...form, name: e.target.value })} required />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Cargo / Subtítulo</Form.Label>
                            <Form.Control value={form.subtitle ?? ''} onChange={e => setForm({ ...form, subtitle: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Resumo curto (Teaser)</Form.Label>
                            <Form.Control as="textarea" rows={2} value={form.teaser ?? ''} onChange={e => setForm({ ...form, teaser: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Biografia</Form.Label>
                            <Form.Control as="textarea" rows={4} value={form.bio ?? ''} onChange={e => setForm({ ...form, bio: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Localização</Form.Label>
                            <Form.Control value={form.location ?? ''} onChange={e => setForm({ ...form, location: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Links (email, lattes, etc)</Form.Label>
                            <Form.Control value={form.links ?? ''} onChange={e => setForm({ ...form, links: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Ordem de exibição</Form.Label>
                            <Form.Control type="number" value={form.sort_order ?? 0} onChange={e => setForm({ ...form, sort_order: Number(e.target.value) })} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Foto {form.image_url && <span className="text-muted small">(atual: {form.image_url})</span>}</Form.Label>
                            <Form.Control type="file" accept="image/*" onChange={e => setPhotoFile((e.target as HTMLInputElement).files?.[0] ?? null)} />
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
