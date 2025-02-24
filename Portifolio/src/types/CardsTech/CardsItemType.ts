import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { IconType } from "react-icons";


export interface CardsItemType{
    icon: IconDefinition | IconType | (IconDefinition | IconType)[]
    imagem?: string
    title: string 
    description?: string
    color: string
}