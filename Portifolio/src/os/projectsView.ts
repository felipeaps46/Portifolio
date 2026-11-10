import type { TFunction } from "i18next";
import { projects } from "../data/projects";
import comingSoon from "../assets/comingSoon.png";

export type ProjectView = {
  id: string;
  name: string;
  description: string;
  tech: string;
  done: boolean;
  image?: string;
  video?: string;
  videoFile?: string;
  siteLink?: string;
  gitHubLink?: string;
};

function slug(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getProjects(t: TFunction): ProjectView[] {
  return projects.map((p) => {
    const name = t(p.title);
    return {
      id: p.id,
      name,
      description: t(p.description),
      tech: p.languages.join(" · "),
      done: p.status === "projects.status.done",
      image: p.image && p.image !== comingSoon ? p.image : undefined,
      video: p.video,
      videoFile: p.video ? `${slug(name)}.mp4` : undefined,
      siteLink: p.siteLink,
      gitHubLink: p.gitHubLink,
    };
  });
}
