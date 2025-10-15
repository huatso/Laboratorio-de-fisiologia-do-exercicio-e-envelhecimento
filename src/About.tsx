// src/Sobre.tsx

import React from 'react';

function Sobre() {
  return (
    <div>
      {/* Jumbotron/Header Section */}
      <div className="bg-light p-5 rounded-lg mb-5">
        <div className="container">
          <h1 className="display-4">Sobre o LAFEE</h1>
          <p className="lead">
            O Laboratório de Fisiologia do Exercício e Envelhecimento (LAFEE) se dedica a investigar os mecanismos pelos quais o exercício físico impacta o processo de envelhecimento, promovendo saúde e longevidade.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {/* Main Content Section */}
          <div className="col-lg-8">
            <h3 className="mb-3">Nossa Missão</h3>
            <p>
              Nossa missão é produzir conhecimento científico de ponta sobre as interações entre exercício e envelhecimento, formando pesquisadores de excelência e transferindo esse conhecimento para a sociedade. Buscamos entender como intervenções de atividade física podem prevenir e tratar doenças crônicas associadas à idade, melhorando a qualidade de vida da população.
            </p>
            <h3 className="mt-4 mb-3">Linhas de Pesquisa</h3>
            <p>
              As pesquisas do LAFEE se concentram em áreas como adaptações neuromusculares, controle cardiovascular, respostas metabólicas ao exercício e o impacto da atividade física na função cognitiva de idosos. Utilizamos abordagens que vão desde a biologia molecular até estudos aplicados em humanos.
            </p>
            <h3 className="mt-4 mb-3">Infraestrutura</h3>
            <p>
              Contamos com instalações modernas para avaliações funcionais e bioquímicas, incluindo equipamentos para ergoespirometria, análise de marcha, eletromiografia de superfície e dinamometria isocinética.
            </p>
          </div>

          {/* Professor's Card Section */}
          <div className="col-lg-4">
            <div className="card text-center shadow-sm">
              <img 
                src="https://i.pravatar.cc/300?img=60" // Placeholder image for the professor
                className="card-img-top p-4" 
                alt="Foto do Professor Luciano Pontes" 
              />
              <div className="card-body">
                <h5 className="card-title">Prof. Dr. Luciano Pontes</h5>
                <p className="card-text text-muted">Coordenador do LAFEE</p>
                <p className="card-text small">
                  Doutor em Fisiologia Humana pela Universidade de São Paulo, com foco em adaptações cardiovasculares ao treinamento físico em populações idosas.
                </p>
                <a href="#" className="btn btn-outline-primary btn-sm">Currículo Lattes</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sobre;