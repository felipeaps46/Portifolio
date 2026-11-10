import type { CardType } from "../Types/cardType";
import bbfVideo from '../assets/bbf.mp4'
import gagroVideo from '../assets/gagro.mp4'
import optimaVideo from '../assets/optima.mp4'
import voogleVideo from '../assets/voogle.mp4'
import comingSoon from "../assets/comingSoon.png"
import bbfImage from "../assets/bbfImage.png"
import gagroImage from "../assets/gagroImage.png"
import optimaImage from "../assets/optimaImage.png"
import portifolioImage from "../assets/portifolioImage.png"
import voogleImage from "../assets/voogleImage.png"

export const projects: CardType[] = [
  {
    id: "1",
    title: "projects.Voogle.title",
    description: "projects.Voogle.description",
    languages: ["React", "Tailwind", "TypeScript"],
    type: "projects.types.landing",
    status: "projects.status.done",
    image: voogleImage,
    date: '01/05/2023',
    highlight: true,
    video: voogleVideo,
  },
  {
    id: "2",
    title: "projects.GestorX.title",
    description: "projects.GestorX.description",
    languages: ["React", "TypeScript", "NodeJs", "Prisma", "PostgreSQL", "Sass"],
    type: "projects.types.others",
    status: "projects.status.inProgress",
    highlight: true,
    date: '01/05/2023',
    image: comingSoon
  },
  {
    id: "3",
    title: "projects.Portifolio.title",
    description: "projects.Portifolio.description",
    languages: ["React", "TypeScript", "Langchain", "Gemini", "Python", "Fast API", "Material UI"],
    type: "projects.types.sites",
    status: "projects.status.done",
    image: portifolioImage,
    date: '01/05/2023'
  },
  {
    id: "4",
    title: "projects.G-agro.title",
    description: "projects.G-agro.description",
    languages: ["React", "JavaScript", "Java", "SpringBoot", "PostgreSQL"],
    type: "projects.types.sites",
    status: "projects.status.done",
    image: gagroImage,
    date: '01/05/2023',
    video: gagroVideo
  },
  {
    id: "5",
    title: "projects.BasicoBemFeito.title",
    description: "projects.BasicoBemFeito.description",
    languages: ["HTML5", "CSS3", "JavaScript"],
    type: "projects.types.sites",
    status: "projects.status.done",
    image: bbfImage,
    date: '01/05/2023',
    video: bbfVideo
  },
  {
    id: "6",
    title: "projects.Optima.title",
    description: "projects.Optima.description",
    languages: ["Next.Js", "SCSS", "TypeScript", "Node.js", "Express.js", "Prisma", "PostgreSQL"],
    type: "projects.types.sites",
    status: "projects.status.done",
    image: optimaImage,
    date: '01/05/2023',
    video: optimaVideo
  },
  {
    id: "7",
    title: "projects.Ajunta.title",
    description: "projects.Ajunta.description",
    languages: ["Next.Js", "CSS3", "TypeScript", "GraphQL", "Golang", "PostgreSQL", "Redis", "Aws", "Docker"],
    type: "projects.types.sites",
    status: "projects.status.inProgress",
    image: comingSoon,
    date: '01/05/2023',
    highlight: true
  },

];