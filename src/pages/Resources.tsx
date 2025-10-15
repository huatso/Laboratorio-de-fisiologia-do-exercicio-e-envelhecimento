// src/Resources.tsx

import React from 'react';

// Fictional data for the resource files.
// Replace these with your actual file details and Google Drive links.
const resourceFiles = [
  {
    id: 1,
    title: 'Artigo sobre Fisiologia do Esforço.pdf',
    description: 'Publicação de 2024 sobre as adaptações cardiovasculares.',
    downloadUrl: 'YOUR_GOOGLE_DRIVE_LINK_HERE_1', // Paste your link here
  },
  {
    id: 2,
    title: 'Planilha de Coleta de Dados.xlsx',
    description: 'Modelo de planilha para coleta de dados de VO2 máximo.',
    downloadUrl: 'YOUR_GOOGLE_DRIVE_LINK_HERE_2', // Paste your link here
  },
  {
    id: 3,
    title: 'Apresentação sobre Biomecânica.pptx',
    description: 'Slides da apresentação do último congresso da equipe.',
    downloadUrl: 'YOUR_GOOGLE_DRIVE_LINK_HERE_3', // Paste your link here
  },
  {
    id: 4,
    title: 'Software de Análise Estatística.zip',
    description: 'Pacote com scripts e software para análise estatística em R.',
    downloadUrl: 'YOUR_GOOGLE_DRIVE_LINK_HERE_4', // Paste your link here
  },
];

function Resources() {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">Recursos e Downloads</h1>
      
      <div className="list-group">
        {resourceFiles.map((file) => (
          <div key={file.id} className="list-group-item d-flex justify-content-between align-items-center">
            {/* File Info Section */}
            <div>
              <h5 className="mb-1">
                <i className="bi bi-file-earmark-text me-2"></i> {/* File Icon */}
                {file.title}
              </h5>
              <p className="mb-1">{file.description}</p>
            </div>

            {/* Download Button Section */}
            <a 
              href={file.downloadUrl} 
              target="_blank" // Opens the link in a new tab
              rel="noopener noreferrer" // Security best practice
              className="btn btn-success"
            >
              <i className="bi bi-download me-2"></i> {/* Download Icon */}
              Baixar
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Resources;