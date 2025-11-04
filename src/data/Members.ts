import DefaultProfile from "../assets/profile/Default.png";
import Rodrigo from "../assets/profile/Rodrigo_villar.jpg"
import Ana from "../assets/profile/Ana_paula.jpg"
import Ruy from "../assets/profile/Ruy_barbosa.jpg"
import Taina from "../assets/profile/Taina_costa.jpg"
import Lucas from "../assets/profile/Lucas_marques.jpg"
import Joao from "../assets/profile/Joao_paulo.jpg"
import Aylton from "../assets/profile/Aylton_jose.jpg"
import Felicio from "../assets/profile/Felicio_savioli.jpg"
import Danilo from "../assets/profile/Danilo_sales.jpg"

export interface Member {
    Id: number;
    Name: string; 
    ImageUrl: string; 
    SubTitle: string;
    Teaser: string;
    Bio: string;
    Location: string;
    Links: string;
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
        Links: "lucianopontes@usp.br", // Email, Linkedin, Github, etc
    },
    {
        Id: 2,
        Name: "Leandro Brasil Rego", 
        ImageUrl: DefaultProfile, 
        SubTitle: "Pós-Graduação",
        Teaser:"",
        Bio: "",
        Location: "São Paulo - BR",
        Links: "http://lattes.cnpq.br/2489448067323873", // Email, Linkedin, Github, etc
    },
    {
        Id: 3,
        Name: "Ruy Barbosa Martins Calheiros Netto", 
        ImageUrl: Ruy, 
        SubTitle: "Pós-Graduação",
        Teaser:"",
        Bio: "Possui graduação em Educação Física pela Universidade de Santo Amaro-UNISA, Mestrado em Ciências do Movimento Humano pela Universidade Cruzeiro do Sul-UNICSUL. Atualmente é Professor titular da Universidade Municipal de São Caetano do Sul-USCS e aluno de Doutorado no programa de Pós-Graduação em Gerontologia pela Escola de Artes, Ciências e Humanidades da Universidade de São Paulo-EACH-USP. ",
        Location: "São Paulo - BR",
        Links: "http://lattes.cnpq.br/7837616003060870", // Email, Linkedin, Github, etc
    },
    {
        Id: 4,
        Name: "Taína Costa Nonato", 
        ImageUrl: Taina, 
        SubTitle: "Pós-Graduação",
        Teaser:"",
        Bio: "",
        Location: "São Paulo - BR",
        Links: "http://lattes.cnpq.br/4236304464623906", // Email, Linkedin, Github, etc
    },
    {
        Id: 5,
        Name: "Rodrigo Chaves da Silva", 
        ImageUrl: DefaultProfile, 
        SubTitle: "Pós-Graduação",
        Teaser: " ",
        Bio: "Possui graduação em Gestão Hospitalar pela Universidade Anhembi Morumbi e Gerontologia pela Escola de Artes, Ciências e Humanidades da Universidade de São Paulo-EACH-USP. Atualmente é pesquisador do Instituto Dante Pazzanese de Cardiologia-IDPC e aluno do Mestrado no Programa de Pós-Graduação em Gerontologia pela Escola de Artes, Ciências e Humanidades da Universidade de São Paulo-EACH-USP. ",
        Location: "São Paulo - BR",
        Links: "http://lattes.cnpq.br/1665363937150810"
    },
    {
        Id: 6,
        Name: "Lucas Marques Vieira", 
        ImageUrl: Lucas, 
        SubTitle: "Pós-Graduação",
        Teaser:"",
        Bio: "Possui Graduação em Educação Física pela Universidade Federal de São Paulo-UNIFESP e Residência Multiprofissional na área de Saúde Pública pela Pontifícia Universidade Católica de São Paulo-PC. Atualmente é aluno de Mestrado no Programa de Pós-Graduação em Gerontologia pela Escola de Artes, Ciências e Humanidades da Universidade de São Paulo-EACH-USP. ",
        Location: "São Paulo - BR",
        Links: "http://lattes.cnpq.br/4996201644508327", // Email, Linkedin, Github, etc
    },
    {
        Id: 7,
        Name: 'Ana Paula de Souza Lima',
        ImageUrl: Ana,
        SubTitle: "Pós-Graduação",
        Teaser:" ",
        Bio: "Possui graduação em Educação Física pela Universidade Mogi das Cruzes-UMC. Especialização em Algias da Coluna Vertebra pela Faculdade Unileya. Analista de Informações, Cultura e Desporto da Secretaria Municipal de Esportes-PMSP. Atualmente é aluna no Programa de Pós-Graduação em Gerontologia pela Escola de Artes, Ciências e Humanidades da Universidade de São Paulo-EACH-USP. ",
        Location: "São Paulo - BR",
        Links: "http://lattes.cnpq.br/7065004099846705"
    },
    {
        Id: 8,
        Name: 'João Paulo Pinto',
        ImageUrl: Joao,
        SubTitle: "Pós-Graduação",
        Teaser:" ",
        Bio: "Possui Graduação em Gerontologia pela Escola de Artes, Ciências e Humanidades da Universidade de São Paulo-EACH-USP. Especialista MBA em Administração Hospitalar e Sistemas de Saúde pelo Centro Universitário Faculdade de Medicina do ABC, Gestão da Qualidade e Processos pela FM2S Educação Consultoria, Gestão de Projetos e Metodologias Ágeis pela FM2S Educação Consultoria. Atualmente é aluno de Mestrado no programa de Pós-Graduação em Gerontologia pela Escola de Artes, Ciências e Humanidades da Universidade de São Paulo-EACH-USP. ",
        Location: "São Paulo - BR",
        Links: "http://lattes.cnpq.br/8821060836747211"
    },
    {
        Id: 9,
        Name: 'Rodrigo Villar',
        ImageUrl: Rodrigo,
        SubTitle: "Pesquisador",
        Teaser:" ",
        Bio: " ",
        Location: " ",
        Links: " "
    },
    {
        Id: 10,
        Name: 'Aylton José Figueira Junior',
        ImageUrl: Aylton,
        SubTitle: "Pesquisador",
        Teaser:" ",
        Bio: "Universidade São Judas Tadeu-USJT. Programa de Pós-graduação em Educação Física",
        Location: "São Paulo - BR",
        Links: "http://lattes.cnpq.br/1107427417348652"
    },
    {
        Id: 11,
        Name: 'Danilo Sales Bocalini',
        ImageUrl: Danilo,
        SubTitle: "Pesquisador",
        Teaser:" ",
        Bio: "Universidade Federal do Espírito Santo, Centro de Educação Física e Desportos-UFES. Programa de Pós-Graduação em Educação Física.",
        Location: "São Paulo - BR",
        Links: "http://lattes.cnpq.br/6290090639004596"
    },
    {
        Id: 12,
        Name: 'Felício Savioli Neto',
        ImageUrl: DefaultProfile,
        SubTitle: "Felicio",
        Teaser:" ",
        Bio: "Instituto Dante Pazzanese de Cardiologia/Setor de Cardiogeriatria ",
        Location: "São Paulo - BR",
        Links: "http://lattes.cnpq.br/1217943416869111"
    },
    {
        Id: 13,
        Name: 'Ysis Barreto Donati',
        ImageUrl: DefaultProfile,
        SubTitle: "Graduação",
        Teaser:" ",
        Bio: "Instituto Dante Pazzanese de Cardiologia/Setor de Cardiogeriatria ",
        Location: "São Paulo - BR",
        Links: "http://lattes.cnpq.br/1217943416869111"
    },
    {
        Id: 14,
        Name: 'Barbara Rafaela Rubino da Silva',
        ImageUrl: DefaultProfile,
        SubTitle: "Graduação",
        Teaser:" ",
        Bio: "Instituto Dante Pazzanese de Cardiologia/Setor de Cardiogeriatria ",
        Location: "São Paulo - BR",
        Links: "http://lattes.cnpq.br/1217943416869111"
    },
    {
        Id: 15,
        Name: 'Eloa Silva Lira',
        ImageUrl: DefaultProfile,
        SubTitle: "Graduação",
        Teaser:" ",
        Bio: "Instituto Dante Pazzanese de Cardiologia/Setor de Cardiogeriatria ",
        Location: "São Paulo - BR",
        Links: "http://lattes.cnpq.br/1217943416869111"
    },
];

export default MembersData;
