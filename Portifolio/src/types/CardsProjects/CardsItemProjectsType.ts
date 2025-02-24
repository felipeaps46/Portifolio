import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { IconType } from "react-icons"

export interface CardsItemProjectsType{
    image: string
    title: string
    description: string
    link: string
    type: string
    technologies: (IconDefinition | IconType)[]
}