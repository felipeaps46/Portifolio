import { faReact, faJava, faJs, faBootstrap, faHtml5, faCss3, faSass } from "@fortawesome/free-brands-svg-icons";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import projeto01 from "../imgs/projeto01.png";
import projeto02 from "../imgs/projeto02.png";
import projeto03 from "../imgs/projeto03.png";

import { SiTypescript } from "react-icons/si";

export const ProjetosData = [
    {
        title: "G-AGRO",
        image: projeto03,
        description: "Projeto acadêmico desenvolvido para a disciplina de Trabalho Interdisciplinar no segundo período do curso. O objetivo foi criar um sistema de gerenciamento agrícola para otimizar a organização e o controle da produção rural.",
        link: "https://github.com/felipeaps46/pmg-es-2024-2-ti2-3687100-g-agro",
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
        link: "https://github.com/ProjetoVoogle/Voogle",
        type: "Seguros",
        technologies: [
            faReact,
            faJs,
            faSass,
            SiTypescript
        ]
    },
    {
        title: "Básico Bem Feito",
        image: projeto01,
        description: "Projeto desenvolvido na disciplina de Trabalho Interdisciplinar do primeiro período do curso, com foco na criação de um sistema para gestão e acompanhamento de treinos.",
        link: "https://github.com/felipeaps46/BasicoBemFeito",
        type: "Academia",
        technologies: [
            faJs,
            faCss3,
            faHtml5,
            faBootstrap
        ]
    }
];

export default ProjetosData;
