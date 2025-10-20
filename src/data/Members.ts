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
        Name: "Lúcia Wang", 
        ImageUrl: DefaultProfile, 
        SubTitle: "Gerontologia - USP",
        Teaser: "Estudante de graduação do curso de Gerontologia na EACH-USP, trabalhando ativamente em projetos de pesquisa sobre envelhecimento ativo, tecnologias assistivas e bem-estar em comunidades rurais.",   
        Bio: "Lúcia Wang é uma promissora estudante de Gerontologia na Escola de Artes, Ciências e Humanidades da USP (EACH). Sua paixão reside na intersecção entre tecnologia e longevidade. Ela integra o grupo de pesquisa 'Tecnologia e Envelhecimento', onde colabora na avaliação da usabilidade de aplicativos e dispositivos vestíveis ('wearables') para monitoramento de idosos. Além da pesquisa, Lúcia é voluntária em um projeto social que promove a alfabetização digital para pessoas com mais de 60 anos, visando reduzir a exclusão social e fomentar a participação cívica na terceira idade.",
        Location: "São Paulo - BR",
        ContactLinks: "luciawang@usp.br", // Email, Linkedin, Github, etc
    },
    {
        Id: 3,
        Name: "Pesquisador 3", 
        ImageUrl: DefaultProfile, 
        SubTitle: "Gerontologia - USP",
        Teaser: "Estudante de graduação do curso de Gerontologia na EACH-USP, trabalhando ativamente em projetos de pesquisa sobre envelhecimento ativo, tecnologias assistivas e bem-estar em comunidades rurais.",   
        Bio: "Lúcia Wang é uma promissora estudante de Gerontologia na Escola de Artes, Ciências e Humanidades da USP (EACH). Sua paixão reside na intersecção entre tecnologia e longevidade. Ela integra o grupo de pesquisa 'Tecnologia e Envelhecimento', onde colabora na avaliação da usabilidade de aplicativos e dispositivos vestíveis ('wearables') para monitoramento de idosos. Além da pesquisa, Lúcia é voluntária em um projeto social que promove a alfabetização digital para pessoas com mais de 60 anos, visando reduzir a exclusão social e fomentar a participação cívica na terceira idade.",
        Location: "São Paulo - BR",
        ContactLinks: "example@usp.br", // Email, Linkedin, Github, etc
    },
    {
        Id: 4,
        Name: "Pesquisador 4", 
        ImageUrl: DefaultProfile, 
        SubTitle: "Gerontologia - USP",
        Teaser: "Estudante de graduação do curso de Gerontologia na EACH-USP, trabalhando ativamente em projetos de pesquisa sobre envelhecimento ativo, tecnologias assistivas e bem-estar em comunidades rurais.",   
        Bio: "Lúcia Wang é uma promissora estudante de Gerontologia na Escola de Artes, Ciências e Humanidades da USP (EACH). Sua paixão reside na intersecção entre tecnologia e longevidade. Ela integra o grupo de pesquisa 'Tecnologia e Envelhecimento', onde colabora na avaliação da usabilidade de aplicativos e dispositivos vestíveis ('wearables') para monitoramento de idosos. Além da pesquisa, Lúcia é voluntária em um projeto social que promove a alfabetização digital para pessoas com mais de 60 anos, visando reduzir a exclusão social e fomentar a participação cívica na terceira idade.",
        Location: "São Paulo - BR",
        ContactLinks: "example@usp.br", // Email, Linkedin, Github, etc
    },
    {
        Id: 5,
        Name: "Pesquisador 5", 
        ImageUrl: DefaultProfile, 
        SubTitle: "Gerontologia - USP",
        Teaser: "Estudante de graduação do curso de Gerontologia na EACH-USP, trabalhando ativamente em projetos de pesquisa sobre envelhecimento ativo, tecnologias assistivas e bem-estar em comunidades rurais.",   
        Bio: "Lúcia Wang é uma promissora estudante de Gerontologia na Escola de Artes, Ciências e Humanidades da USP (EACH). Sua paixão reside na intersecção entre tecnologia e longevidade. Ela integra o grupo de pesquisa 'Tecnologia e Envelhecimento', onde colabora na avaliação da usabilidade de aplicativos e dispositivos vestíveis ('wearables') para monitoramento de idosos. Além da pesquisa, Lúcia é voluntária em um projeto social que promove a alfabetização digital para pessoas com mais de 60 anos, visando reduzir a exclusão social e fomentar a participação cívica na terceira idade.",
        Location: "São Paulo - BR",
        ContactLinks: "example@usp.br", // Email, Linkedin, Github, etc
    },
    {
        Id: 6,
        Name: "Pesquisador 6", 
        ImageUrl: DefaultProfile, 
        SubTitle: "Gerontologia - USP",
        Teaser: "Estudante de graduação do curso de Gerontologia na EACH-USP, trabalhando ativamente em projetos de pesquisa sobre envelhecimento ativo, tecnologias assistivas e bem-estar em comunidades rurais.",   
        Bio: "Lúcia Wang é uma promissora estudante de Gerontologia na Escola de Artes, Ciências e Humanidades da USP (EACH). Sua paixão reside na intersecção entre tecnologia e longevidade. Ela integra o grupo de pesquisa 'Tecnologia e Envelhecimento', onde colabora na avaliação da usabilidade de aplicativos e dispositivos vestíveis ('wearables') para monitoramento de idosos. Além da pesquisa, Lúcia é voluntária em um projeto social que promove a alfabetização digital para pessoas com mais de 60 anos, visando reduzir a exclusão social e fomentar a participação cívica na terceira idade.",
        Location: "São Paulo - BR",
        ContactLinks: "example@usp.br", // Email, Linkedin, Github, etc
    },
];

export default MembersData;
