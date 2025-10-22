import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Research.css';
import ResearchesData, { ResearchProject } from '../data/Researches';

function ResearchesPage() {
    return (
        <Container className="my-5 researches-container">
            <h1 className="page-title text-center mb-5">Nossas Linhas de Pesquisa</h1>

            <div className="research-list-container">
                {ResearchesData.map((line) => (
                    // Container principal da linha de pesquisa
                    <div key={line.Id} className="research-item-block">
                        
                        <Row>
                            {/* Coluna Principal: Título, Descrição, Líder */}
                            <Col md={8}>
                                <h3 className="research-title-main">
                                    {/* Icone em Ciano Claro para visual */}
                                    <i className="bi bi-flask-fill me-2"></i> 
                                    {line.Title}
                                </h3>
                                
                                <p className="leader-info text-muted small mb-3">
                                    Líder: <strong className="leader-name">{line.Lead}</strong>
                                </p>
                                
                                <p className="research-description-text">{line.Description}</p>
                            </Col>

                            {/* Coluna de Projetos Atuais (Lista Simples) */}
                            <Col md={4}>
                                <h6 className="section-subtitle mt-4 mt-md-0">Projetos Atuais</h6>
                                <ul className="project-list">
                                    {line.Projects.map((project, idx) => (
                                        <li key={idx} className="project-list-item">
                                            <i className="bi bi-arrow-right-short me-2"></i> {project}
                                        </li>
                                    ))}
                                </ul>
                            </Col>
                        </Row>
                    </div>
                ))}
            </div>
        </Container>
    );
}

export default ResearchesPage;