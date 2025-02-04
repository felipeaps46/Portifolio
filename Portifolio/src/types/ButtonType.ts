import { IconDefinition } from "@fortawesome/fontawesome-svg-core"

export interface ButtonType{
    label: string
    onBtnClick?: () => void
    icon?: IconDefinition
}