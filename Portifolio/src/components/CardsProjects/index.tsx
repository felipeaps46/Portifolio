import styles from "./styles.module.scss"
import { CardsProjectsType } from "../../types/CardsProjects/CardsProjectsType"
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

const CardsProjects: React.FC<CardsProjectsType> = (props: CardsProjectsType) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleInfo = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <>
            <div className={styles.main}>
                {props.items.map((item, index) => (
                    <div className={styles.itemContainer} key={index}>
                        <div className={styles.imageContainer}>
                            <img src={item.image} alt={item.title}></img>
                            <button className={styles.infoBtn} onClick={() => toggleInfo(index)}>
                                <FontAwesomeIcon icon={faInfo} className={styles.icon}/>
                            </button>
                        </div>
                        <div className={`${styles.infoContainer} ${activeIndex === index ? styles.active : ""}`}>
                            <h2 className={styles.title}>{item.title}</h2>
                            <p className={styles.description}>{item.description}</p>
                        </div>

                    </div>
                ))}
            </div>
        </>
    )
}
export default CardsProjects