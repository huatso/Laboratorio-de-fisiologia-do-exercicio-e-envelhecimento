// src/Equipe.tsx

import React from 'react';

// Fictional data for the lab members
const labMembers = [
  {
    id: 1,
    name: 'Dra. Ana Souza',
    role: 'Coordenadora / Professora Doutora',
    description: 'Líder do Laboratório de Fisiologia do Exercício, com foco em adaptações metabólicas ao treinamento de endurance.',
    imageUrl: 'https://i.pravatar.cc/300?img=56', // Placeholder image
    isCoordinator: true,
  },
  {
    id: 2,
    name: 'Carlos Andrade',
    role: 'Doutorando',
    description: 'Pesquisando o efeito da hipóxia no desempenho de atletas de elite.',
    imageUrl: 'https://i.pravatar.cc/300?img=68', // Placeholder image
    isCoordinator: false,
  },
  {
    id: 3,
    name: 'Juliana Ferreira',
    role: 'Mestranda',
    description: 'Estudando a resposta hormonal em treinos de força para a terceira idade.',
    imageUrl: 'https://i.pravatar.cc/300?img=32', // Placeholder image
    isCoordinator: false,
  },
  {
    id: 4,
    name: 'Lucas Martins',
    role: 'Iniciação Científica',
    description: 'Analisando dados de variabilidade da frequência cardíaca em ciclistas.',
    imageUrl: 'https://i.pravatar.cc/300?img=14', // Placeholder image
    isCoordinator: false,
  },
];

// Separate the coordinator from the rest of the members
const coordinator = labMembers.find(member => member.isCoordinator);
const otherMembers = labMembers.filter(member => !member.isCoordinator);

function Equipe() {
  return (
    <div className="container my-5">
      {/* Page Title */}
      <h1 className="text-center mb-5">Nossa Equipe</h1>

      {/* Coordinator Section (Emphasis) 👨‍🏫 */}
      {coordinator && (
        <div className="row justify-content-center mb-5">
          <div className="col-md-10">
            <div className="card shadow-sm p-3">
              <div className="row g-0 align-items-center">
                <div className="col-md-4 text-center">
                  <img 
                    src={coordinator.imageUrl} 
                    className="img-fluid rounded-circle" 
                    alt={coordinator.name} 
                    style={{ maxWidth: '200px', border: '5px solid #FFA500' }} 
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h2 className="card-title">{coordinator.name}</h2>
                    <h5 className="card-subtitle mb-2 text-muted">{coordinator.role}</h5>
                    <p className="card-text">{coordinator.description}</p>
                    <a href="#" className="btn btn-outline-primary">Ver Publicações</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <hr className="my-5" />

      {/* Other Members Section 🧑‍🔬 */}
      <div className="row">
        {otherMembers.map((member) => (
          <div key={member.id} className="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch">
            <div className="card text-center w-100 member-card shadow-sm">
              <img 
                src={member.imageUrl} 
                className="card-img-top p-4 rounded-circle" 
                alt={member.name}
                style={{ width: '180px', height: '180px', objectFit: 'cover', margin: '0 auto' }}
              />
              <div className="card-body">
                <h5 className="card-title">{member.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{member.role}</h6>
                <p className="card-text">{member.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Equipe;