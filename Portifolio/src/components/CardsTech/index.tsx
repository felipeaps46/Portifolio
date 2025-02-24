import styles from "./styles.module.scss"
import { CardsType } from "../../types/CardsTech/CardsType"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconType } from "react-icons"


const Cards: React.FC<CardsType> = ({ items }) => {



    return (
        <>
            <div className={`${styles.main} ${styles.wrapper}`}>
                {items.map((item, index) => (
                    <div className={styles.itemContainer} key={index} >
                        <div className={styles.iconContainer} style={{ backgroundColor: item.color }}>
                            {Array.isArray(item.icon) ? (
                                item.icon.map((tech, i) => {
                                    if ("prefix" in tech) {
                                        return <FontAwesomeIcon key={i} icon={tech} className={styles.icon} />;
                                    } else {
                                        const IconComponent = tech as IconType;
                                        return <IconComponent key={i} className={styles.icon} />;
                                    }
                                })
                            ) : (
                               
                                "prefix" in item.icon ? (
                                    <FontAwesomeIcon icon={item.icon} className={styles.icon} />
                                ) : (
                                
                                    (() => {
                                        const IconComponent = item.icon as IconType;
                                        return <IconComponent className={styles.techIcon} />;
                                    })()
                                )
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