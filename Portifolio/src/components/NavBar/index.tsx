import styles from "./styles.module.scss";
import Button from "../Button";
import useScrolled from "../../hooks/useScrolled"; 

const NavBar: React.FC = () => {
    const isScrolled = useScrolled();

    return (
        <div className={!isScrolled ? styles.main : styles.mainScrolled}>
            <div className={styles.leftMenu}>
                <span className={styles.icon}>F</span>
                <h1 className={styles.nameTitle}>
                    <span style={{ fontWeight: "bold" }}>Felipe</span> Pereira
                </h1>
            </div>
            <div className={styles.rightMenu}>
                <a href="" className={styles.linkText}>Home</a>
                <a href="" className={styles.linkText}>Sobre Mim</a>
                <a href="" className={styles.linkText}>Habilidades</a>
                <a href="" className={styles.linkText}>Trabalhos</a>

                <div className={styles.btnContainer}>
                    <Button label="Contato" onBtnClick={() => console.log("Você clicou aqui")} />
                </div>
            </div>
        </div>
    );
};

export default NavBar;
