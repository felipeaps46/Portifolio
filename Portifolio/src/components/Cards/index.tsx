import styles from "./styles.module.scss"
import { CardsType } from "../../types/Cards/CardsType"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { colors } from "../../data/Colors"


const Cards: React.FC<CardsType> = ({ items }) => {
    return (
        <>
            <div className={styles.main}>
                {items.map((item, index) => (
                    <div className={styles.itemContainer} key={index}>
                        <div className={styles.iconContainer} style={{backgroundColor: colors[item.title]}}>
                            {item.icon && (

                                <FontAwesomeIcon icon={item.icon} className={styles.icon} />

                            )}
                        </div>
                        <div className={styles.textContainer}>
                            <h2 className={styles.titulo}>{item.title}</h2>
                        </div>
                    </div>
                ))}
            </div >
        </>
    )
}


export default Cards