import { useEffect, useState } from 'react';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import { getMembers, getResources, getPublications, getStorageStats } from '../api';

function formatBytes(bytes: number): string {
    return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
}

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [counts, setCounts] = useState({ members: 0, resources: 0, publications: 0 });
    const [storage, setStorage] = useState({ used: 0, limit: 300 * 1024 * 1024 });

    useEffect(() => {
        Promise.all([getMembers(), getResources(), getPublications(), getStorageStats()])
            .then(([members, resources, publications, stats]) => {
                setCounts({ members: members.length, resources: resources.length, publications: publications.length });
                setStorage(stats);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" role="status" />
            </div>
        );
    }

    const percent = Math.min(100, (storage.used / storage.limit) * 100);

    return (
        <div>
            <h2 className="mb-4">Dashboard</h2>
            <Row className="g-3 mb-4">
                <Col md={4}>
                    <Card className="p-3">
                        <div className="text-muted small">Membros</div>
                        <div className="fs-3 fw-bold">{counts.members}</div>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="p-3">
                        <div className="text-muted small">Recursos</div>
                        <div className="fs-3 fw-bold">{counts.resources}</div>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="p-3">
                        <div className="text-muted small">Publicações</div>
                        <div className="fs-3 fw-bold">{counts.publications}</div>
                    </Card>
                </Col>
            </Row>
            <Card className="p-3">
                <div className="text-muted small mb-2">
                    Armazenamento: {formatBytes(storage.used)} / {formatBytes(storage.limit)}
                </div>
                <div className="storage-bar-track">
                    <div className="storage-bar-fill" style={{ width: `${percent}%` }} />
                </div>
            </Card>
        </div>
    );
}
