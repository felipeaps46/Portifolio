import { IconDefinition } from "@fortawesome/fontawesome-svg-core"

export interface CardsItemProjectsType{
    image: string
    title: string
    description: string
    link: string
    type: string
    technologies: Array<IconDefinition>
}