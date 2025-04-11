import { CardsExperienceType } from "../../types/CardsExperience/CardsExperienceType";
import styles from "./styles.module.scss";

const ExperienceCard: React.FC<CardsExperienceType> = (props) => {
    return (
        <div
            className={styles.card}
            data-aos="fade-right"
            data-aos-duration={props.duration}
        >
            {props.image && (
                <div className={styles.imageContainer}>
                    <img src={props.image} alt={`${props.title} image`} />
                </div>
            )}
            <div className={styles.content}>
                <div className={styles.date}>{props.date}</div>
                <h3 className={styles.title}>{props.title}</h3>
                <p className={styles.description}>{props.description}</p>
            </div>
        </div>
    );
};

export default ExperienceCard;