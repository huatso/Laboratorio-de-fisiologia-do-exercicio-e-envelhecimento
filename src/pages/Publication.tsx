// 1. Importe o 'useState' do React
import { useState } from 'react'; 
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
  const groupedPublications = groupPublicationsByYear(publicationsData);
  const sortedYears = Object.keys(groupedPublications).sort((a, b) => Number(b) - Number(a));

  // --- 2. Lógica de Paginação ---
  const [currentPage, setCurrentPage] = useState(1);
  const [yearsPerPage] = useState(1); // Quantos anos você quer mostrar por página

  // Calcula o total de páginas
  const totalPages = Math.ceil(sortedYears.length / yearsPerPage);

  // Calcula os anos para a página atual
  const indexOfLastYear = currentPage * yearsPerPage;
  const indexOfFirstYear = indexOfLastYear - yearsPerPage;
  const currentYears = sortedYears.slice(indexOfFirstYear, indexOfLastYear);

  // Funções para mudar de página
  const handleNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages)); // Não deixa passar da última
  };
  const handlePrev = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1)); // Não deixa ser menor que 1
  };
  // --- Fim da Lógica de Paginação ---

  return (
    <div className="publications-container">
      <h1 className="page-title">Publicações</h1>

      {/* 3. Mapeia apenas os 'currentYears' em vez de 'sortedYears' */}
      {currentYears.map(year => (
        <div key={year} className="mb-5">
          <h2 className="year-title">{year}</h2>

          {groupedPublications[Number(year)].map(pub => (
            <div key={pub.id} className="publication-card">
              
              <div className="publication-field">
                <span className="publication-label">Título</span>
                <strong className="publication-title">{pub.title}</strong>
              </div>

              <div className="publication-field">
                <span className="publication-label">Autores</span>
                <p className="publication-authors">{pub.authors}</p>
              </div>

              <div className="publication-field">
                <span className="publication-label">Fonte</span>
                <p className="publication-source-details">
                  <em className="publication-source">{pub.source}</em>
                  {pub.details && `, ${pub.details}`}
                  . <a href={pub.link} target="_blank" rel="noopener noreferrer">Acessar Artigo</a>
                </p>
              </div>
              
            </div>
          ))}
        </div>
      ))}

{/* 4. Adiciona os controles de paginação (MODIFICADO) */}
      <div className="pagination-controls">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          &larr; Ano Anterior
        </button>
        
        {/* O texto "Página X de Y" foi removido */}
        
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Próximo Ano &rarr;
        </button>
      </div>

    </div>
  );
}

export default Publicacoes;