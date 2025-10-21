// Arquivo: src/pages/About.tsx

import React from 'react';
import './About.css'; // O CSS que criamos antes continua o mesmo

function Sobre() {
  return (
    <div>
      {/* Título Principal */}
      <h1 className="about-page-title">Sobre o LAFEE</h1>

      {/* Seção de Introdução (Texto Reformulado) */}
      <div className="about-intro-section">
        <p className="intro-lead">
          O Laboratório de Fisiologia do Exercício e Envelhecimento (LaFEE) da EACH-USP é um núcleo de pesquisa focado em compreender as complexas interações entre a atividade física, o processo de envelhecimento e a saúde humana.
        </p>
      </div>

      {/* Conteúdo Principal e Barra Lateral */}
      <div className="about-content-grid">
        {/* Seção de Conteúdo Principal (Textos Reformulados) */}
        <div className="about-main-content">
          <h3 className="about-section-title">
            <i className="bi bi-bullseye section-icon"></i>
            Nossa Missão
          </h3>
          <div className="about-text-content">
            <p>
              Nossa missão é produzir conhecimento científico de ponta sobre os efeitos do exercício físico na capacidade funcional e nas comorbidades associadas ao envelhecimento. Buscamos desenvolver e validar intervenções que possam melhorar a qualidade de vida, a autonomia e a saúde cardiovascular da população idosa.
            </p>
          </div>

          <h3 className="about-section-title">
            <i className="bi bi-lightbulb section-icon"></i>
            Linhas de Pesquisa
          </h3>
          <div className="about-text-content">
            <p>
              Nossas investigações se concentram em:
            </p>
            <ul>
              <li>Adaptações cardiovasculares e metabólicas ao exercício físico em idosos.</li>
              <li>Efeitos de diferentes modalidades de treino (ex: HIIT, treinamento remoto) na capacidade funcional e autonomia.</li>
              <li>Fisiologia do exercício aplicada a doenças crônicas e comorbidades do envelhecimento (ex: síndrome metabólica, hipertensão).</li>
              <li>Controle autonômico cardiovascular durante o esforço em diferentes populações.</li>
            </ul>
          </div>
          
          <h3 className="about-section-title">
            <i className="bi bi-tools section-icon"></i>
            Infraestrutura
          </h3>
          <div className="about-text-content">
            {/* NOTA: Mantive este texto, pois ele é 100% coerente 
              com as linhas de pesquisa encontradas (VO2, marcha, força).
            */}
            <p>
              Contamos com instalações modernas para avaliações funcionais e bioquímicas, incluindo equipamentos para ergoespirometria (análise de VO2), análise de marcha, eletromiografia de superfície (EMG) e dinamometria isocinética.
            </p>
          </div>
        </div>

        {/* Seção do Card do Professor (Informações Atualizadas) */}
        <div className="about-sidebar">
          <div className="professor-card">
            <img 
              // Imagem de um congresso, parece ser o Prof. Luciano Pontes
              src="https://jornal.usp.br/wp-content/uploads/2018/03/20180312_FRANCISCO-LUCIANO-PONTES-JUNIOR.jpg" 
              className="professor-photo" 
              alt="Foto do Professor Francisco Luciano Pontes Júnior" 
            />
            <h5 className="professor-name">Prof. Dr. Francisco Luciano Pontes Júnior</h5>
            <p className="professor-role">Coordenador do LaFEE</p>
            <p className="professor-description">
              Professor Associado do curso de Gerontologia da EACH-USP. Possui Doutorado em Fisiologia Humana (ICB-USP) e Pós-Doutorado pela FMRP-USP. Lidera pesquisas com foco no envelhecimento, fisiologia do exercício e saúde cardiovascular.
            </p>
            <a 
              href="http://lattes.cnpq.br/0450348084689386" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="lattes-btn"
            >
              Currículo Lattes
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sobre;