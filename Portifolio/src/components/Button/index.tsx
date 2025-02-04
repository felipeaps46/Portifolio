import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ButtonType } from "../../types/ButtonType"
import styles from "./styles.module.scss"

const Button: React.FC<ButtonType> = (props: ButtonType) => {
    return (
        <>
            <button className={styles.btn} onClick={props.onBtnClick}>
                {props.icon && (
                    <FontAwesomeIcon icon={props.icon} className={styles.icon}/>
                )}
                {props.label}

            </button>
        </>
    )
}

export default Button