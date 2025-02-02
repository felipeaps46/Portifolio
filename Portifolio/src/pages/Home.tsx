import styles from "../styles/home.module.scss"

import NavBar from "../components/NavBar"
import Animation from "../components/Animation"
import Cards from "../components/Cards"

import useDocumentTitle from "../hooks/useDocumentTitle"
import useFavicon from "../hooks/useFavicon"

import Icone from "../imgs/icone.png"
import ImagemPessoal from "../imgs/imagemPessoal.jpeg"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload } from "@fortawesome/free-solid-svg-icons"

import { HabilidadesData } from "../data/HabilidadesData"



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
                    <div className={styles.secaoSobre_Content}>
                        <div className={styles.secaoSobre_Esquerda}>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime voluptas, ad officia cum, veniam pariatur voluptates recusandae ut culpa blanditiis cumque quos laboriosam architecto ipsum sint ipsam eius ducimus cupiditate.</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis atque porro itaque enim neque odio eius cumque beatae fugit. Quas nobis doloremque ab minus labore illo inventore molestiae nesciunt neque?</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis repellendus vitae earum ad distinctio dignissimos exercitationem natus. Laborum, odit! Asperiores labore voluptatem molestias praesentium autem doloribus alias necessitatibus ipsa? Totam.</p>
                        </div>
                        <div className={styles.secaoSobre_Direita}>
                            <Animation animationUrl={"https://assets9.lottiefiles.com/packages/lf20_m9lwcxrc.json"} />
                        </div>
                    </div>
                </section>
                <section className={styles.secaoHabilidades}>
                    <div className={styles.tituloSecao}>
                        <h2 className={styles.titulo}>Habilidades</h2>
                    </div>
                    <div className={styles.cardsContainer}>
                        <Cards items={HabilidadesData} />
                    </div>

                </section>
                <section className={styles.secaoPortifolio}>
                    <div className={styles.tituloSecao}>
                        <h2 className={styles.titulo}>Portifolio</h2>
                    </div>
                </section>
                <section className={styles.secaoContato}>
                    <div className={styles.tituloSecao}>
                        <h2 className={styles.titulo}>Contato</h2>
                    </div>
                </section>
            </div>
        </>
    )
}