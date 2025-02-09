import styles from "./styles.module.scss";
import Button from "../Button";
import useScrolled from "../../hooks/useScrolled"; 
import { NavBarType } from "../../types/NavBarType";

const NavBar: React.FC <NavBarType> = ({ scrollToSection, refs }) => {
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
                <a className={styles.linkText} onClick={() => scrollToSection(refs.homeRef)} style={{cursor: "pointer"}}>Home</a>
                <a className={styles.linkText} onClick={() => scrollToSection(refs.sobreRef)} style={{cursor: "pointer"}}>Sobre Mim</a>
                <a className={styles.linkText} onClick={() => scrollToSection(refs.habilidadesRef)} style={{cursor: "pointer"}}>Habilidades</a>
                <a className={styles.linkText} onClick={() => scrollToSection(refs.trabalhosRef)} style={{cursor: "pointer"}}>Trabalhos</a>

                <div className={styles.btnContainer}>
                    <Button label="Contato" onBtnClick={() => scrollToSection(refs.contatoRef)} />
                </div>
            </div>
        </div>
    );
};

export default NavBar;
