import React, { useMemo } from 'react';
import { Accordion, ListGroup, Button } from 'react-bootstrap'; 
import './Resources.css';

import resourceFiles, { Resource } from "../data/Resources"; 

type GroupedResources = {
    [tag: string]: Resource[];
};

function ResourcesPage() {
    const groupedResources = useMemo(() => {
        const groups: GroupedResources = {};

        resourceFiles.forEach(file => {
            const tag = file.Tag && file.Tag.trim() !== '' ? file.Tag : 'Sem Tema';

            if (!groups[tag]) {
                groups[tag] = [];
            }
            groups[tag].push(file);
        });

        Object.keys(groups).forEach(tag => {
            groups[tag].sort((a, b) => a.Title.localeCompare(b.Title));
        });

        return groups;
    }, [resourceFiles]);

    const sortedTags = Object.keys(groupedResources).sort();

    return (
        <div className="p-4"> 
            <h1 className="page-title mb-4">Recursos e Downloads</h1>

            <Accordion defaultActiveKey={sortedTags[0]}> 
                {sortedTags.map((tag) => (
                    <Accordion.Item eventKey={tag} key={tag}>
                        
                        <Accordion.Header>
                            {tag} ({groupedResources[tag].length} arquivos)
                        </Accordion.Header>

                        <Accordion.Body className="p-0">
                            
                            <ListGroup variant="flush">
                                {groupedResources[tag].map((file: Resource) => (
                                    <ListGroup.Item 
                                        key={file.Id} 
                                        className="d-flex justify-content-between align-items-center"
                                    >
                                        <div className="resource-details me-3">
                                            <div className="d-flex align-items-center mb-1">
                                                <i className="bi bi-file-earmark-text me-2"></i>
                                                
                                                <strong className="me-2">{file.Title}</strong>
                                                
                                                {file.UploadYearMonth && (
                                                    <small className="text-muted">
                                                        (Upload: {file.UploadYearMonth})
                                                    </small>
                                                )}
                                            </div>
                                            
                                            {file.Description && (
                                                <p className="mb-0 text-secondary small">{file.Description}</p>
                                            )}
                                        </div>

                                        {file.DownloadUrl ? (
                                            <Button 
                                                href={file.DownloadUrl}
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
        </div>
    );
}

export default ResourcesPage;