export type User = {
    name: string,
    img?: string,
    desc: string,
    emailName: string,
    linkedinName: string
    githubName: string
    links?: {
        github?: string,
        linkedin?: string,
        email?: string,
        whatsapp?: string
    },
    telefone: string,
    curriculo: string,
    caracteristicas: string[]
} 