export interface Resource {
    Id: number;
    Title: string;
    Description?: string;
    DownloadUrl?: string;
    UploadYearMonth?: string;
    Tag?: string;
}

const Resources: Resource[] = [
    //
    //     SAMPLE
    // {
    //     Id: 1,
    //     Title: "Planilha de Coleta de Dados.xlsx",
    //     Description:'Modelo de planilha para coleta de dados de VO2 máximo.',
    //     DownloadUrl: "#",
    //     UploadYearMonth: "2025-09",
    //     Tag: "Disciplina de Pós-Graduação",
    // },
    //
    {
        Id: 1,
        Title: "Planilha de Coleta de Dados.xlsx",
        Description:'Modelo de planilha para coleta de dados de VO2 máximo.',
        DownloadUrl: "#",
        UploadYearMonth: "2025-09",
        Tag: "Disciplina de Pós-Graduação",
    },
    {
        Id: 2,
        Title: "Artigo sobre Fisiologia do Esforço.pdf",
        Description:'Publicação sobre as adaptações cardiovasculares.',
        DownloadUrl: `${(import.meta as any).env?.BASE_URL ?? '/'}archives/pos-graduacao/artigo-fisiologia-esforco.pdf`,
        UploadYearMonth: "2025-09",
        Tag: "Disciplina de Pós-Graduação",
    },
    {
        Id: 3,
        Title: "Apresentação sobre Biomecânica.pptx",
        Description:'Slides da apresentação do último congresso da equipe.',
        DownloadUrl: "#",
        UploadYearMonth: "2025-09",
        Tag: "Congresso",
    },
];

export default Resources;
