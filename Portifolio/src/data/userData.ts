import type { User } from "../Types/userType";
import profileImg from "../assets/profile.jpeg";
import curriculo from "../assets/curriculo.pdf"

export const userData: User = {
    name: "Felipe Pereira",
    img: profileImg,
    desc: "user.desc",
    emailName: 'felipeaps0918@gmail.com',
    linkedinName: 'felipe-sousa',
    githubName: 'felipeaps46',
    links: {
        github: "https://github.com/felipeaps46",
        linkedin: "https://www.linkedin.com/in/felipe-sousa-974004210/",
        email: "felipeaps0918@gmail.com"
    },
    telefone: "+5531971316645",
    curriculo,
    caracteristicas: [
        "user.fullstack",
        "user.backend",
        "user.frontend",
        "user.software"
    ]
}