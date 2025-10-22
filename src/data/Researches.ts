// research.ts ou researches.ts
export interface ResearchProject {
    Id: number;
    Title: string; // Nome da Linha de Pesquisa (Ex: Tecnologia e Longevidade)
    Lead: string;  // Líder da Linha (Ex: Dr. Francisco Pontes)
    Description: string; // Detalhamento da linha e seu foco
    Projects: string[]; // Lista de projetos ou tópicos de pesquisa dentro dessa linha
    ImageUrl?: string; // Imagem/Ícone da Linha
}

const ResearchesData: ResearchProject[] = [
// Exemplo de como a entrada de dados deve parecer no seu arquivo Researches.ts
// Adicione ou substitua este objeto dentro do array ResearchesData.
    {
    Id: 1, // Ajuste o ID conforme necessário
    Title: "Intervenção em Treinamento Físico e Avaliação Remota da Capacidade Funcional em Idosos",
    Lead: "Dr. Francisco Luciano Pontes",
    Description: "Foco na investigação e aplicação de programas de treinamento físico supervisionado (com ênfase em controle de cadência) para a melhoria dos parâmetros de aptidão funcional e qualidade de vida em idosos. A linha também abrange a validação e o desenvolvimento de metodologias de avaliação remota e autoadministrada da capacidade funcional em populações de idosos isolados ou residentes na comunidade.",
    Projects: [ 
        "Eficácia da cadência controlada no treinamento funcional de idosos.", 
        "Validação de protocolos de testes funcionais autoadministrados em ambiente doméstico.", 
        "Impacto da intervenção física na qualidade de vida e nível de atividade em idosos." 
    ],
    // ImageUrl é opcional. Inclua se tiver o caminho:
    // ImageUrl: "/assets/img/icon-fitness.svg" 
    }
];

export default ResearchesData;
