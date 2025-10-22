import React, { useMemo } from 'react'; 
import { Accordion, ListGroup } from 'react-bootstrap'; 
import './Publication.css'; 
import * as bibtexParse from 'bibtex-parse-js';
import { rawBibtex } from '../data/publications.bib';

// --- Lógica de Conversão (Permanece igual) ---
interface Publication {
    id: number;
    year: number;
    authors: string;
    title: string;
    source: string;
    details: string;
    link: string;
}
const parsedEntries = bibtexParse.toJSON(rawBibtex);
const publicationsData: Publication[] = parsedEntries.map((entry, index) => {
    const fields = entry.entryTags;
    const cleanDoi = fields.doi ? fields.doi.replace('/BIBTEX', '') : '';
    let details = '';
    if (fields.volume) details += `Vol. ${fields.volume}`;
    if (fields.issue) details += `, No. ${fields.issue}`;
    if (fields.pages) details += `, pp. ${fields.pages}`;
    details = details.startsWith(', ') ? details.substring(2) : details;
    return {
        id: index,
        year: Number(fields.year) || 0,
        title: fields.title || 'Título não disponível',
        authors: fields.author ? fields.author.replace(/ and /gi, ', ') : 'Autores não disponíveis',
        source: fields.journal || fields.publisher || 'Fonte não disponível',
        details: details,
        link: fields.doi ? `https://doi.org/${cleanDoi}` : (fields.url || '#')
    };
});
// --- Fim da Lógica de Conversão ---

interface GroupedPublications {
    [key: number]: Publication[];
}

const groupPublicationsByYear = (data: Publication[]): GroupedPublications => {
    return data.reduce((acc: GroupedPublications, publication: Publication) => {
        const year = publication.year;
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(publication);
        return acc;
    }, {});
};

function Publicacoes() {
    // 1. Agrupa e ordena os dados
    const groupedPublications = useMemo(() => groupPublicationsByYear(publicationsData), []);
    
    // Ordena os anos de forma decrescente (mais recente primeiro)
    const sortedYears = Object.keys(groupedPublications)
        .map(Number)
        .sort((a, b) => b - a)
        .map(String);

    // O array de chaves ativas será TODOS os anos
    const allYears = sortedYears;

    return (
        <div className="publications-container p-4">
            <h1 className="page-title mb-4">Publicações Científicas</h1>

            {/* MUDANÇA AQUI: Usa allYears como defaultActiveKey E adiciona alwaysOpen */}
            <Accordion defaultActiveKey={allYears} alwaysOpen>
                {sortedYears.map(year => (
                    <Accordion.Item eventKey={year} key={year}>
                        
                        <Accordion.Header>
                            Ano {year} ({groupedPublications[Number(year)].length} publicações)
                        </Accordion.Header>

                        <Accordion.Body className="p-0">
                            
                            <ListGroup variant="flush">
                                {groupedPublications[Number(year)].map(pub => (
                                    <ListGroup.Item 
                                        key={pub.id} 
                                        className="publication-item d-flex justify-content-between align-items-start"
                                    >
                                        <div className="publication-details me-3">
                                            
                                            <strong className="publication-title">{pub.title}</strong>
                                            
                                            <p className="publication-authors mb-1">
                                                {pub.authors}
                                            </p>
                                            
                                            <p className="publication-source-details mb-0">
                                                <em className="publication-source">{pub.source}</em>
                                                {pub.details && `, ${pub.details}`}
                                                {pub.link !== '#' && (
                                                    <span className="ms-2">
                                                        . <a href={pub.link} target="_blank" rel="noopener noreferrer">Acessar Artigo</a>
                                                    </span>
                                                )}
                                            </p>
                                        </div>
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

export default Publicacoes;