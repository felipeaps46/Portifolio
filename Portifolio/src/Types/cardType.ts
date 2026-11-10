export type ProjectType = 'Sites' | 'Landing Pages' | 'Aplicativos' | 'E-Commerce' | 'Outros' | string;

export interface CardType {
    id: string,
    title: string,
    description: string,
    languages: string[],
    type: ProjectType,
    status: string,
    image?: string,
    video?: string,
    highlight?: boolean
    date: string
    siteLink?: string,
    gitHubLink?: string
}

