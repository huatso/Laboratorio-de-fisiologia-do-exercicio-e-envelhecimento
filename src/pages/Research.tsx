// src/Pesquisa.tsx

import React from 'react';

// Fictional data for research projects. Replace with your own.
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

function Pesquisa() {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">Linhas de Pesquisa</h1>

      {researchProjects.map((project, index) => (
        <div key={project.id}>
          {/* Research Area Title and Description */}
          <h2 className="fw-bold">{project.title}</h2>
          <p className="lead">{project.description}</p>

          {/* Images Section */}
          <div className="row my-4 text-center">
            {project.images.map((image, imgIndex) => (
              <div key={imgIndex} className="col-md-6 mb-3">
                <img src={image.url} className="img-fluid" alt={image.caption} />
                <p className="mt-2 fst-italic">{image.caption}</p>
              </div>
            ))}
          </div>

          {/* Publications List */}
          <div>
            {project.publications.map(pub => (
              <p key={pub.id} className="mb-2">
                <a href={pub.link} target="_blank" rel="noopener noreferrer">{pub.text}</a>
              </p>
            ))}
          </div>
          
          {/* Add a divider between sections, but not after the last one */}
          {index < researchProjects.length - 1 && <hr className="my-5" />}

        </div>
      ))}
    </div>
  );
}

export default Pesquisa;