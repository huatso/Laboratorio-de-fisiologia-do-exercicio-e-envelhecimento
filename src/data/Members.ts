import DefaultProfile from "../assets/profile/Default.png";
export interface Member {
    Id: number;
    Name: string; 
    ImageUrl: string; 
    SubTitle: string;
    Teaser: string;
    Bio: string;
    Location: string;
    ContactLinks: string;
}

const MembersData: Member[] = [
    {
        Id: 1,
        Name: "Francisco Luciano Pontes", 
        ImageUrl: DefaultProfile, 
        SubTitle: "PhD Sciences - USP",
        Teaser: "Atualmente é docente do curso de Bacharelado e do programa de pós-graduação em Gerontologia da Escola de Artes, Ciências e Humanidades da Universidade de São Paulo-EACH/USP",
        Bio: "sdnflkasnflnasdf",
        Location: "São Paulo - BR",
        ContactLinks: "lucianopontes@usp.br", // Email, Linkedin, Github, etc
    },
    {
        Id: 2,
        Name: "Pesquisador 2", 
        ImageUrl: DefaultProfile, 
        SubTitle: "Gerontologia - USP",
        Teaser: "Estudante de graduação do curso de Gerontologia na EACH-USP, trabalhando ativamente em projetos de pesquisa sobre envelhecimento ativo, tecnologias assistivas e bem-estar em comunidades rurais.",   
        Bio: "Pesquisador(a) afiliado(a) ao curso de Gerontologia da Escola de Artes, Ciências e Humanidades da USP (EACH). Sua área de atuação principal é a intersecção entre tecnologia e longevidade, com foco no desenvolvimento e avaliação de ferramentas para o envelhecimento ativo.\n\nAtua ativamente no grupo de pesquisa 'Tecnologia e Envelhecimento', concentrando esforços na usabilidade de dispositivos vestíveis ('wearables') e aplicativos para monitoramento de idosos. Possui experiência em projetos de extensão que visam a inclusão digital de adultos 60+, contribuindo para a redução da exclusão social e o fomento da participação cívica.",
        Location: "São Paulo - BR",
        ContactLinks: "email@usp.br", // Email, Linkedin, Github, etc
    },
    {
        Id: 3,
        Name: "Pesquisador 3", 
        ImageUrl: DefaultProfile, 
        SubTitle: "Gerontologia - USP",
        Teaser: "Estudante de graduação do curso de Gerontologia na EACH-USP, trabalhando ativamente em projetos de pesquisa sobre envelhecimento ativo, tecnologias assistivas e bem-estar em comunidades rurais.",   
        Bio: "Pesquisador(a) afiliado(a) ao curso de Gerontologia da Escola de Artes, Ciências e Humanidades da USP (EACH). Sua área de atuação principal é a intersecção entre tecnologia e longevidade, com foco no desenvolvimento e avaliação de ferramentas para o envelhecimento ativo.\n\nAtua ativamente no grupo de pesquisa 'Tecnologia e Envelhecimento', concentrando esforços na usabilidade de dispositivos vestíveis ('wearables') e aplicativos para monitoramento de idosos. Possui experiência em projetos de extensão que visam a inclusão digital de adultos 60+, contribuindo para a redução da exclusão social e o fomento da participação cívica.",
        Location: "São Paulo - BR",
        ContactLinks: "email@usp.br", // Email, Linkedin, Github, etc
    },
    {
        Id: 4,
        Name: "Pesquisador 4", 
        ImageUrl: DefaultProfile, 
        SubTitle: "Gerontologia - USP",
        Teaser: "Estudante de graduação do curso de Gerontologia na EACH-USP, trabalhando ativamente em projetos de pesquisa sobre envelhecimento ativo, tecnologias assistivas e bem-estar em comunidades rurais.",   
        Bio: "Pesquisador(a) afiliado(a) ao curso de Gerontologia da Escola de Artes, Ciências e Humanidades da USP (EACH). Sua área de atuação principal é a intersecção entre tecnologia e longevidade, com foco no desenvolvimento e avaliação de ferramentas para o envelhecimento ativo.\n\nAtua ativamente no grupo de pesquisa 'Tecnologia e Envelhecimento', concentrando esforços na usabilidade de dispositivos vestíveis ('wearables') e aplicativos para monitoramento de idosos. Possui experiência em projetos de extensão que visam a inclusão digital de adultos 60+, contribuindo para a redução da exclusão social e o fomento da participação cívica.",
        Location: "São Paulo - BR",
        ContactLinks: "email@usp.br", // Email, Linkedin, Github, etc
    },
    {
        Id: 5,
        Name: "Pesquisador 5", 
        ImageUrl: DefaultProfile, 
        SubTitle: "Gerontologia - USP",
        Teaser: "Estudante de graduação do curso de Gerontologia na EACH-USP, trabalhando ativamente em projetos de pesquisa sobre envelhecimento ativo, tecnologias assistivas e bem-estar em comunidades rurais.",   
        Bio: "Pesquisador(a) afiliado(a) ao curso de Gerontologia da Escola de Artes, Ciências e Humanidades da USP (EACH). Sua área de atuação principal é a intersecção entre tecnologia e longevidade, com foco no desenvolvimento e avaliação de ferramentas para o envelhecimento ativo.\n\nAtua ativamente no grupo de pesquisa 'Tecnologia e Envelhecimento', concentrando esforços na usabilidade de dispositivos vestíveis ('wearables') e aplicativos para monitoramento de idosos. Possui experiência em projetos de extensão que visam a inclusão digital de adultos 60+, contribuindo para a redução da exclusão social e o fomento da participação cívica.",
        Location: "São Paulo - BR",
        ContactLinks: "email@usp.br", // Email, Linkedin, Github, etc
    },
    {
        Id: 6,
        Name: "Pesquisador 6", 
        ImageUrl: DefaultProfile, 
        SubTitle: "Gerontologia - USP",
        Teaser: "Estudante de graduação do curso de Gerontologia na EACH-USP, trabalhando ativamente em projetos de pesquisa sobre envelhecimento ativo, tecnologias assistivas e bem-estar em comunidades rurais.",   
        Bio: "Pesquisador(a) afiliado(a) ao curso de Gerontologia da Escola de Artes, Ciências e Humanidades da USP (EACH). Sua área de atuação principal é a intersecção entre tecnologia e longevidade, com foco no desenvolvimento e avaliação de ferramentas para o envelhecimento ativo.\n\nAtua ativamente no grupo de pesquisa 'Tecnologia e Envelhecimento', concentrando esforços na usabilidade de dispositivos vestíveis ('wearables') e aplicativos para monitoramento de idosos. Possui experiência em projetos de extensão que visam a inclusão digital de adultos 60+, contribuindo para a redução da exclusão social e o fomento da participação cívica.",
        Location: "São Paulo - BR",
        ContactLinks: "email@usp.br", // Email, Linkedin, Github, etc
    },
];

export default MembersData;
