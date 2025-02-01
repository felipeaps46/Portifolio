import styles from "./styles.module.scss"

import Button from "../Button"

export default function NavBar() {
    return (
        <>
            <div className={styles.main}>
                <div className={styles.menuEsquerda}>
                    <span className={styles.icone}>F</span>
                    <h1 className={styles.nameTitle}><span style={{fontWeight: "bold"}}>Felipe</span> Pereira</h1>
                </div>
                <div className={styles.menuDireita}>
                    <a href="" className={styles.linkText}>Home</a>
                    <a href="" className={styles.linkText}>Sobre Mim</a>
                    <a href="" className={styles.linkText}>Habilidades</a>
                    <a href="" className={styles.linkText}>Trabalhos</a>

                    <div className={styles.btnContainer}>
                        <Button label="Contato" onBtnClick={() => console.log("voce clicou aqui")} />
                    </div>
                </div>
            </div>
        </>
    )
}