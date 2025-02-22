import styles from "./styles.module.scss"
import { CardsType } from "../../types/CardsTech/CardsType"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const Cards: React.FC<CardsType> = ({ items }) => {
    
   
      
    return (
        <>
            <div className={`${styles.main} ${styles.wrapper}`}>
                {items.map((item, index) => (
                    <div className={styles.itemContainer} key={index} >
                        <div className={styles.iconContainer} style={{backgroundColor: item.color}}>
                            {item.icon && (

                                <FontAwesomeIcon icon={item.icon} className={styles.icon} />

                            )}
                        </div>
                        <div className={styles.textContainer}>
                            <h2 className={styles.title}>{item.title}</h2>
                        </div>
                    </div>
                ))}
            </div >
        </>
    )
}


export default Cards