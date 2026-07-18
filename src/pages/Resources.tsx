import { useEffect, useMemo, useState } from 'react';
import { Accordion, ListGroup, Button, Spinner, Alert } from 'react-bootstrap';
import './Resources.css';

import { getResources } from '../api';
import type { ApiResource } from '../types/api';

type GroupedResources = {
    [tag: string]: ApiResource[];
};

function ResourcesPage() {
    const [resources, setResources] = useState<ApiResource[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getResources()
            .then(setResources)
            .catch(() => setError('Não foi possível carregar os recursos.'))
            .finally(() => setLoading(false));
    }, []);

    const groupedResources = useMemo(() => {
        const groups: GroupedResources = {};

        resources.forEach(file => {
            const tag = file.tag && file.tag.trim() !== '' ? file.tag : 'Sem Tema';

            if (!groups[tag]) {
                groups[tag] = [];
            }
            groups[tag].push(file);
        });

        Object.keys(groups).forEach(tag => {
            groups[tag].sort((a, b) => a.title.localeCompare(b.title));
        });

        return groups;
    }, [resources]);

    const sortedTags = Object.keys(groupedResources).sort();

    return (
        <div className="p-4">
            <h1 className="page-title mb-4">Recursos e Downloads</h1>

            {loading && (
                <div className="text-center my-5">
                    <Spinner animation="border" role="status" />
                </div>
            )}

            {error && <Alert variant="danger">{error}</Alert>}

            {!loading && !error && (
                <Accordion defaultActiveKey={sortedTags[0]}>
                    {sortedTags.map((tag) => (
                        <Accordion.Item eventKey={tag} key={tag}>

                            <Accordion.Header>
                                {tag} ({groupedResources[tag].length} arquivos)
                            </Accordion.Header>

                            <Accordion.Body className="p-0">

                                <ListGroup variant="flush">
                                    {groupedResources[tag].map((file: ApiResource) => (
                                        <ListGroup.Item
                                            key={file.id}
                                            className="d-flex justify-content-between align-items-center"
                                        >
                                            <div className="resource-details me-3">
                                                <div className="d-flex align-items-center mb-1">
                                                    <i className="bi bi-file-earmark-text me-2"></i>

                                                    <strong className="me-2">{file.title}</strong>

                                                    {file.upload_year_month && (
                                                        <small className="text-muted">
                                                            (Upload: {file.upload_year_month})
                                                        </small>
                                                    )}
                                                </div>

                                                {file.description && (
                                                    <p className="mb-0 text-secondary small">{file.description}</p>
                                                )}
                                            </div>

                                            {file.download_url ? (
                                                <Button
                                                    href={file.download_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    variant="primary"
                                                    size="sm"
                                                >
                                                    <i className="bi bi-download me-1"></i> Baixar
                                                </Button>
                                            ) : (
                                                <span className="text-danger small">Link Indisponível</span>
                                            )}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>

                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            )}
        </div>
    );
}

export default ResourcesPage;
