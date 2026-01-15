import React from 'react';
import './About.css';

function Sobre() {
  return (
    <div className="about-container">

      {/* HERO SECTION */}
      <section className="hero-section">

        <video
          className="hero-media"
          src="/running_lady.mp4"  // coloque o vídeo em public/videos
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

          <div className="scroll-indicator">
            <i className="bi bi-chevron-down"></i>
          </div>
        </div>
      </section>

      {/* CONTEÚDO */}
      <div className="content-wrapper">

        <div className="about-intro-section">
          <p className="intro-lead">
            O Laboratório de Fisiologia do Exercício e Envelhecimento (LaFEE) da EACH-USP
            é um núcleo de pesquisa focado em compreender as complexas interações entre
            atividade física, envelhecimento e saúde humana.
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
                Produzir conhecimento científico de ponta sobre os efeitos do exercício
                físico na capacidade funcional e nas comorbidades associadas ao
                envelhecimento, contribuindo para a autonomia e qualidade de vida da
                população idosa.
              </p>
            </div>

            <h3 className="about-section-title">
              <i className="bi bi-lightbulb section-icon"></i>
              Linhas de Pesquisa
            </h3>
            <div className="about-text-content">
              <p>Nossas investigações se concentram em:</p>
              <ul>
                <li>Adaptações cardiovasculares e metabólicas ao exercício físico em idosos.</li>
                <li>Efeitos de diferentes modalidades de treino na capacidade funcional.</li>
                <li>Fisiologia do exercício aplicada a doenças crônicas do envelhecimento.</li>
                <li>Controle autonômico cardiovascular durante o esforço.</li>
              </ul>
            </div>

            <h3 className="about-section-title">
              <i className="bi bi-tools section-icon"></i>
              Infraestrutura
            </h3>
            <div className="about-text-content">
              <p>
                O LaFEE conta com instalações modernas para avaliações funcionais,
                incluindo ergoespirometria, análise de marcha, eletromiografia (EMG)
                e dinamometria isocinética.
              </p>
            </div>

          </div>

          <div className="about-sidebar">
            <div className="professor-card">
              <img
                src="https://i1.rgstatic.net/ii/profile.image/638345700970496-1529204883121_Q128/Francisco-Pontes.jpg"
                alt="Foto do Professor Francisco Luciano Pontes Júnior"
                className="professor-photo"
              />
              <h5 className="professor-name">
                Prof. Dr. Francisco Luciano Pontes Júnior
              </h5>
              <p className="professor-role">Coordenador do LaFEE</p>
              <p className="professor-description">
                Professor Associado do curso de Gerontologia da EACH-USP.
                Doutor em Fisiologia Humana (ICB-USP) e Pós-Doutorado pela FMRP-USP.
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
    </div>
  );
}

export default Sobre;
