import { RefObject } from "react";

export interface NavBarType {
    scrollToSection: (ref: RefObject<HTMLDivElement>) => void;
    refs: {
        homeRef: RefObject<HTMLDivElement>;
        sobreRef: RefObject<HTMLDivElement>;
        experienciasRef: RefObject<HTMLDivElement>;
        habilidadesRef: RefObject<HTMLDivElement>;
        trabalhosRef: RefObject<HTMLDivElement>;
        contatoRef: RefObject<HTMLDivElement>;
    };
}
