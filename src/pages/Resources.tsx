import React from 'react';
import './Resources.css'; // Importe o novo CSS

// Fictional data for the resource files.
// Substitua pelas suas informações e links do Google Drive.
const resourceFiles = [
  {
    id: 1,
    title: 'Artigo sobre Fisiologia do Esforço.pdf',
    description: 'Publicação de 2024 sobre as adaptações cardiovasculares.',
    downloadUrl: '#', // Cole seu link aqui
  },
  {
    id: 2,
    title: 'Planilha de Coleta de Dados.xlsx',
    description: 'Modelo de planilha para coleta de dados de VO2 máximo.',
    downloadUrl: '#', // Cole seu link aqui
  },
  {
    id: 3,
    title: 'Apresentação sobre Biomecânica.pptx',
    description: 'Slides da apresentação do último congresso da equipe.',
    downloadUrl: '#', // Cole seu link aqui
  },
];

function Resources() {
  return (
    // O container principal é o <main className="main-content"> do seu AppLayout
    <div>
      <h1 className="page-title">Recursos e Downloads</h1>
      
      <div className="resource-list">
        {resourceFiles.map((file) => (
          <div key={file.id} className="resource-card">
            
            {/* Seção de Informações do Arquivo */}
            <div className="resource-info">
              <h5 className="resource-title">
                {/* Ícone do Arquivo */}
                <i className="bi bi-file-earmark-text resource-icon"></i>
                {file.title}
              </h5>
              <p className="resource-description">{file.description}</p>
            </div>

            {/* Seção do Botão de Download */}
            <a 
              href={file.downloadUrl} 
              target="_blank" // Abre em nova aba
              rel="noopener noreferrer" 
              className="resource-download-btn"
            >
              {/* Ícone de Download */}
              <i className="bi bi-download download-icon"></i>
              Baixar
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Resources;