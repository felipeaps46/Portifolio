import styles from "./styles.module.scss"
import { CardsProjectsType } from "../../types/CardsProjects/CardsProjectsType"
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const CardsProjects: React.FC<CardsProjectsType> = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleInfo = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className={styles.main}>
            {items.map((item, index) => (
                <div className={styles.itemContainer} key={index}>
                    <div className={styles.imageContainer}>
                        <img src={item.image} alt={item.title} />
                        <a className={styles.gitBtn} href={item.link} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faGithub} className={styles.icon} />
                        </a>
                    </div>
                    <div className={styles.infoContainer}>
                        <div className={styles.divTitle}>
                            <h2 className={styles.title}>{item.title}</h2>
                            <span className={styles.projectType}>{item.type}</span>
                        </div>
                        <div className={styles.divDescription}>
                            <p className={styles.description}>{item.description}</p>
                        </div>

                        <div className={styles.techIcons}>
                            <h3>Tecnologias: </h3>
                            {item.technologies.map((tech, i) => (
                                <FontAwesomeIcon key={i} icon={tech} className={styles.techIcon} />
                            ))}
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
}
export default CardsProjects