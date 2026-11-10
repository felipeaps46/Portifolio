export interface ExperienceType {
    role: string,
    company: string,
    startDate: string,
    finalDate: string | null,
    description: string,
    type: "Trabalho" | "Voluntariado" | "Estudo" | string
}

