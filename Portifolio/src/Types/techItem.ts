// src/Types/techItem.ts
import type { ElementType } from "react";

export type OrderedCategory =
  | "habilidadesSecao.filtros.todos"
  | "habilidadesSecao.filtros.frontend"
  | "habilidadesSecao.filtros.backend"
  | "habilidadesSecao.filtros.mobile"
  | "habilidadesSecao.filtros.database"
  | "habilidadesSecao.filtros.devops"
  | "habilidadesSecao.filtros.testing"
  | "habilidadesSecao.filtros.design"
  | "habilidadesSecao.filtros.tools"
  | "habilidadesSecao.filtros.outros";

// Item de skill
export interface TechItem {
  name: string;
  icon: ElementType;          // aceita tanto react-icons quanto MUI icons
  category?: string;          // manter flexível e normalizar no uso
  color?: string;             // cor do ícone (herdada por CSS)
  bg?: string;                // fundo do quadrinho do ícone
  ariaLabel?: string;
  link?: string;              // para abrir no clique
}

// Props do componente de grade de skills
export interface TechSkillsProps {
  items: TechItem[];
  gap?: number;               // Grid spacing
  iconSize?: number;          // px
  iconBoxHeight?: number;     // px
  iconBoxWidth?: number;      // px
  rounded?: number | string;  // borderRadius
  elevation?: number;
  clickable?: boolean;
  showTooltip?: boolean;
  onItemClick?: (item: TechItem) => void;
}