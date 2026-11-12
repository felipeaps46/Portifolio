import { projects } from "../data/projects";
import comingSoon from "../assets/comingSoon.png";
import profile from "../assets/profile.jpeg";
import voogleImage from "../assets/voogleImage.png";
import award1 from "../assets/award-1.jpg";
import award2 from "../assets/award-2.jpg";
import award3 from "../assets/award-3.jpg";

export { profile, award1, award2, award3 };

// Ordem em que os projetos aparecem e a chave de cada um em site.projects.items.
const ORDER: { id: string; key: string }[] = [
  { id: "1", key: "voogle" },
  { id: "4", key: "gagro" },
  { id: "6", key: "optima" },
  { id: "5", key: "bbf" },
  { id: "3", key: "portfolio" },
  { id: "2", key: "gestorx" },
  { id: "7", key: "ajunta" },
];

export type SiteProject = {
  id: string;
  n: string;
  key: string;
  titleKey: string;
  stack: string[];
  done: boolean;
  image?: string;
  video?: string;
  siteLink?: string;
  gitHubLink?: string;
};

export const SITE_PROJECTS: SiteProject[] = ORDER.flatMap(({ id, key }, i) => {
  const p = projects.find((x) => x.id === id);
  if (!p) return [];
  return [
    {
      id,
      n: String(i + 1).padStart(2, "0"),
      key,
      titleKey: p.title,
      stack: p.languages,
      done: p.status === "projects.status.done",
      image: p.image && p.image !== comingSoon ? p.image : undefined,
      video: p.video,
      siteLink: p.siteLink,
      gitHubLink: p.gitHubLink,
    },
  ];
});

export type Experience = {
  key: "vtreal" | "voogle" | "awards" | "degree" | "school";
  photo?: string;
  gray?: boolean;
  /** Caminho de um logo oficial; sem ele, o cartão mostra o nome em texto. */
  logo?: string;
  list: boolean;
  cta?: string;
};

export const EXPERIENCES: Experience[] = [
  { key: "vtreal", photo: profile, gray: true, list: true },
  { key: "voogle", photo: voogleImage, list: false, cta: "#projetos" },
  { key: "awards", photo: award1, list: true, cta: "#/arquivo" },
  { key: "degree", photo: award2, list: false },
  { key: "school", list: false, cta: "#contato" },
];

/** Certificados e papers da página Arquivo. Enquanto vazios, a página mostra "em breve". */
export const CERTIFICATES: { name: string; org: string; year: string; href: string }[] = [];
export const PAPERS: { title: string; venue: string; year: string; href: string }[] = [];

export const STACK_MAIN = "JS · TS · Java · Go · PHP";
export const STACK_MORE = "React · React Native · Expo · Flutter · Node.js · Prisma · Tailwind · Docker · GraphQL · SQL · Git";
