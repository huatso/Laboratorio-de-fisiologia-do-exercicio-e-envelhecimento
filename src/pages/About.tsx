import React from 'react';
import './About.css';

const Sobre: React.FC = () => {
  // Função para realizar o scroll suave até o conteúdo
  const scrollToContent = () => {
    const content = document.getElementById('sobre-inicio');
    if (content) {
      content.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="about-container">
      
      {/* HERO SECTION COM VÍDEO */}
      <section className="hero-section">
        <video
          className="hero-media"
          src="/running_lady.mp4" 
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1 className="hero-title">LaFEE</h1>
          <p className="hero-subtitle">
            Laboratório de Fisiologia do Exercício e Envelhecimento
          </p>
          <p className="hero-tagline">
            Ciência aplicada ao movimento e à longevidade
          </p>
          
          {/* Seta com clique para scroll */}
          <div className="scroll-indicator" onClick={scrollToContent}>
            <i className="bi bi-chevron-down"></i>
          </div>
        </div>
      </section>

      {/* WRAPPER DE CONTEÚDO */}
      <div className="content-wrapper" id="sobre-inicio">
        <h1 className="about-page-title">Sobre o LAFEE</h1>

        <div className="about-intro-section">
          <p className="intro-lead">
            O Laboratório de Fisiologia do Exercício e Envelhecimento (LaFEE) da EACH-USP tem como objetivo 
            desenvolver, integrar e disseminar conhecimentos científicos por meio de atividades de pesquisa, 
            ensino e extensão em fisiologia do exercício aplicada ao envelhecimento humano, com foco na 
            pessoa idosa, visando compreender as respostas fisiológicas, funcionais e clínicas ao exercício 
            físico, formar recursos humanos qualificados e promover intervenções baseadas em evidências 
            que contribuam para a manutenção da funcionalidade, autonomia, saúde e qualidade de vida da 
            população idosa, em articulação com serviços de saúde e a comunidade.
          </p>
        </div>

        <div className="about-content-grid">
          <div className="about-main-content">
            <h3 className="about-section-title">
              <i className="bi bi-bullseye section-icon"></i>
              Nossa Missão
            </h3>
            <div className="about-text-content">
              <p>
                Produzir e aplicar conhecimento científico em fisiologia do exercício e envelhecimento, 
                integrando pesquisa, ensino e extensão, com foco na pessoa idosa, visando à promoção da 
                saúde, funcionalidade, autonomia e qualidade de vida, bem como à formação de profissionais 
                qualificados e à prática baseada em evidências.
              </p>
            </div>

            <h3 className="about-section-title">
              <i className="bi bi-heart section-icon"></i>
              Nossos Valores
            </h3>
            <div className="about-text-content">
              <ul>
                <li>Rigor científico e ética</li>
                <li>Compromisso com a pessoa idosa e o envelhecimento saudável</li>
                <li>Integração entre pesquisa, ensino e extensão</li>
                <li>Interdisciplinaridade e cooperação institucional nacional e internacional</li>
                <li>Inovação baseada em evidências científicas</li>
                <li>Responsabilidade social e impacto em saúde pública</li>
                <li>Formação acadêmica e profissional de excelência</li>
              </ul>
            </div>
          </div>

          <aside className="about-sidebar">
            <div className="professor-card">
              <img 
                src="https://i1.rgstatic.net/ii/profile.image/638345700970496-1529204883121_Q128/Francisco-Pontes.jpg" 
                className="professor-photo" 
                alt="Foto do Professor Francisco Luciano Pontes Júnior" 
              />
              <h5 className="professor-name">Prof. Dr. Francisco Luciano Pontes Júnior</h5>
              <p className="professor-role">Coordenador do LaFEE</p>
              <p className="professor-description">
                Professor Associado do curso de Gerontologia da EACH-USP. Possui Doutorado em 
                Fisiologia Humana (ICB-USP) e Pós-Doutorado pela FMRP-USP. Lidera pesquisas 
                com foco no envelhecimento, fisiologia do exercício e saúde cardiovascular.
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
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Sobre;