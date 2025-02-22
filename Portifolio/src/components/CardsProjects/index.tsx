import styles from "./styles.module.scss"
import { CardsProjectsType } from "../../types/CardsProjects/CardsProjectsType"
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import AOS from 'aos';
import 'aos/dist/aos.css';

const CardsProjects: React.FC<CardsProjectsType> = ({ items }) => {

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleInfo = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className={styles.main}>
            {items.map((item, index) => (
                <div className={styles.card} key={index}>
                    <div className={styles.image} style={{ backgroundImage: `url(${item.image})` }}>
                        <a className={styles.gitBtn} href={item.link} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                        <div className={styles.overlay}>
                            <h2 className={styles.title}>{item.title}</h2>
                            <span className={styles.projectType}>{item.type}</span>
                        </div>
                    </div>

                    <div className={styles.content}>
                        <p className={styles.description}>{item.description}</p>
                        <div className={styles.techIcons}>
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