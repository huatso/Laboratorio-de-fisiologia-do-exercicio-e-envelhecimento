import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Research.css';

const researchesData = [
  {
    id: 1,
    title: "Comportamento cardiovascular ao exercício físico",
    objective: "Investigar as respostas cardiovasculares e hemodinâmicas ao exercício físico agudo e crônico, considerando diferentes intensidades, frequências, durações, modalidades e condições fisiológicas, com vistas à compreensão dos mecanismos de regulação cardiovascular e às implicações para desempenho, saúde e segurança do exercício."
  },
  {
    id: 2,
    title: "Exercício físico e envelhecimento",
    objective: "Analisar as respostas fisiológicas e fisiopatológicas agudas imediatas, agudas tardias e crônicas de pessoas idosas ao exercício físico, contemplando adaptações cardiovasculares, respiratórias, metabólicas e funcionais, bem como suas repercussões na capacidade funcional, fragilidade, autonomia e qualidade de vida durante o processo de envelhecimento."
  },
  {
    id: 3,
    title: "Doenças cardiovasculares e exercício físico",
    objective: "Investigar o papel do exercício físico na prevenção primária e secundária, bem como no tratamento e reabilitação das doenças cardiovasculares, incluindo a análise de seus efeitos sobre fatores de risco, comorbidades associadas, parâmetros clínicos, funcionais e prognósticos, fundamentando intervenções baseadas em evidências."
  }
];

function ResearchesPage() {
  return (
    <Container className="my-5 researches-container">
      <h1 className="page-title text-center mb-5">Linhas de Pesquisa</h1>

      <div className="research-list-container">
        {researchesData.map((line) => (
          <div key={line.id} className="research-item-block">
            <Row className="align-items-center">
              {/* Removida a coluna de numeração para eliminar a sensação de prioridade */}
              <Col xs={12}>
                <h3 className="research-title-main">
                  <i className="bi bi-flask me-2"></i> 
                  {line.title}
                </h3>
                <div className="research-objective-box">
                  <p className="research-description-text">
                    <strong>Objetivo: </strong> 
                    {line.objective}
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default ResearchesPage;