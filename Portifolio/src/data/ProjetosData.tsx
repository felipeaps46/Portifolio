import { faReact, faJava, faJs, faBootstrap } from "@fortawesome/free-brands-svg-icons";
import { faDatabase, faLeaf, faWind } from "@fortawesome/free-solid-svg-icons";
import projeto01 from "../imgs/projeto01.png";
import projeto02 from "../imgs/projeto02.png";
import projeto03 from "../imgs/projeto03.png";

export const ProjetosData = [
    {
        title: "G-AGRO",
        image: projeto03,
        description: "Projeto acadêmico desenvolvido para a disciplina de Trabalho Interdisciplinar no segundo período do curso. O objetivo foi criar um sistema de gerenciamento agrícola para otimizar a organização e o controle da produção rural.",
        link: "",
        type: "Gerenciamento Agrícola",
        technologies: [
            faReact,
            faJava,
            faJs,
            faLeaf,
            faBootstrap
        ]
    },
    {
        title: "Voogle",
        image: projeto02,
        description: "Página estática desenvolvida para um cliente, que visava a adesão de novos leads.",
        link: "",
        type: "Seguros",
        technologies: [
            faReact,
            faJs,
    
        ]
    },
    {
        title: "Básico Bem Feito",
        image: projeto01,
        description: "Projeto desenvolvido na disciplina de Trabalho Interdisciplinar do primeiro período do curso, com foco na criação de um sistema para gestão e acompanhamento de treinos.",
        link: "",
        type: "Academia",
        technologies: [
            faJs,
            faReact,
            faBootstrap
        ]
    }
];

export default ProjetosData;
