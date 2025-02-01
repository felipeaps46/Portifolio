import { ButtonType } from "../../types/ButtonType"
import styles from "./styles.module.scss"

const Button: React.FC<ButtonType> = (props: ButtonType) => {
    return (
        <>
            <button className={styles.btn} onClick={props.onBtnClick}>
                {props.label}
            </button>
        </>
    )
}

export default Button