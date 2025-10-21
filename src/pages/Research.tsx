// Arquivo: src/pages/Research.tsx

import React from 'react';
import './Research.css'; // Importa nosso novo CSS

// Dados fictícios (mantidos)
const researchProjects = [
  {
    id: 1,
    title: 'Controle Motor e Envelhecimento',
    description: 'Investigamos as alterações neuromusculares que ocorrem com o envelhecimento e como o exercício físico pode atenuar a perda de funcionalidade e prevenir quedas em idosos.',
    images: [
      {
        url: 'https://via.placeholder.com/400x250.png?text=Análise+de+Marcha',
        caption: 'Plataforma de força para análise da marcha e equilíbrio postural.',
      },
      {
        url: 'https://via.placeholder.com/400x250.png?text=Eletromiografia',
        caption: 'Eletromiografia de superfície para avaliação da ativação muscular.',
      },
    ],
    publications: [
      {
        id: 101,
        text: 'Souza, A.; Martins, L. Efeito do treinamento de força na estabilidade postural de idosos. Revista Brasileira de Fisiologia do Exercício, Vol.12, pp.94-101, 2024',
        link: '#',
      },
      {
        id: 102,
        text: 'Andrade, C.; Ferreira, J. Correlação entre sarcopenia e risco de quedas em uma população urbana. Archives of Gerontology and Geriatrics, Vol.9, pp.35-42, 2023',
        link: '#',
      },
    ],
  },
  {
    id: 2,
    title: 'Adaptações Cardiovasculares ao Exercício',
    description: 'Este projeto foca em entender como diferentes modalidades de exercício (aeróbico e de força) promovem adaptações no sistema cardiovascular, visando a prevenção de doenças cardíacas.',
    images: [
        {
          url: 'https://via.placeholder.com/400x250.png?text=VO2+Máximo',
          caption: 'Teste ergoespirométrico para determinação do consumo máximo de oxigênio.',
        },
        {
          url: 'https://via.placeholder.com/400x250.png?text=Monitoramento+Cardíaco',
          caption: 'Análise da variabilidade da frequência cardíaca em repouso e durante o exercício.',
        },
    ],
    publications: [
      {
        id: 201,
        text: 'Ferreira, J.; Souza, A. Respostas da pressão arterial após uma sessão de treino de alta intensidade. Journal of Human Hypertension, Vol.6, e10, 2025',
        link: '#',
      },
    ],
  },
];

// Componente renomeado para Research
function Research() {
  return (
    // O container .main-content já centraliza a página
    <div>
      <h1 className="page-title">Linhas de Pesquisa</h1>

      {researchProjects.map((project, index) => (
        // Card de projeto individual
        <section key={project.id} className="research-project-card">
          
          {/* Título e Descrição */}
          <h2 className="project-title">{project.title}</h2>
          <p className="project-description">{project.description}</p>

          {/* Galeria de Imagens (ainda usa o grid do Bootstrap) */}
          <div className="row image-gallery">
            {project.images.map((image, imgIndex) => (
              <div key={imgIndex} className="col-md-6 mb-4">
                <img src={image.url} className="project-image img-fluid" alt={image.caption} />
                <p className="image-caption">{image.caption}</p>
              </div>
            ))}
          </div>

          {/* Lista de Publicações */}
          <div className="publications-section">
            <h5 className="publications-section-title">Publicações Relacionadas</h5>
            <ul className="project-publication-list">
              {project.publications.map(pub => (
                <li key={pub.id}>
                  <a href={pub.link} target="_blank" rel="noopener noreferrer">{pub.text}</a>
                </li>
              ))}
            </ul>
          </div>
          
        </section>
      ))}
    </div>
  );
}

export default Research;