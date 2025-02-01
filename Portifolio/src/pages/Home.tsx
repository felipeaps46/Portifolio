import styles from "../styles/home.module.scss"

import NavBar from "../components/NavBar"

import useDocumentTitle from "../hooks/useDocumentTitle"
import useFavicon from "../hooks/useFavicon"

import Icone from "../imgs/icone.png"
import ImagemPessoal from "../imgs/imagemPessoal.jpeg"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload } from "@fortawesome/free-solid-svg-icons"


export default function Home() {

    useDocumentTitle("Felipe Pereira - Portifolio")
    useFavicon(Icone)

    return (
        <>
            <div className={styles.main}>
                <NavBar></NavBar>

                <section className={styles.secaoInicial}>
                    <div className={styles.secaoInicial_Esquerda}>
                        <img src={ImagemPessoal} alt="Imagem pessoal" className={styles.imagemPessoal} />
                    </div>
                    <div className={styles.secaoInicial_Direita}>
                        <h3 className={styles.subtitulo}>Desenvolvedor</h3>
                        <h2 className={styles.titulo}>Felipe Augusto Pereira</h2>
                        <p className={styles.descricao}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse officiis consequatur id quo omnis laudantium fuga eligendi eos aliquam, in ipsum obcaecati similique tenetur voluptatum ipsa iure ducimus ullam! Tenetur!</p>
                        <div className={styles.secaoInicial_btnsContainer}>
                            <button className={styles.btnCurriculum}>
                                <FontAwesomeIcon icon={faDownload} className={styles.iconeDowload} />
                                <a className={styles.btnText}>Baixar Curriculum</a>
                            </button>
                            <button className={styles.btnContato}>
                                <a className={styles.btnText}>Contato</a>
                            </button>
                        </div>

                    </div>
                </section>
                <section className={styles.secaoSobre}>
                    <div className={styles.tituloSecao}>
                        <h2 className={styles.titulo}>Sobre Mim</h2>
                    </div>
                </section>
                <section className={styles.secaoHabilidades}>

                </section>
                <section className={styles.secaoPortifolio}>

                </section>
                <section className={styles.secaoContato}>

                </section>
            </div>
        </>
    )
}