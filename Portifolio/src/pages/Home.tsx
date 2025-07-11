import styles from "../styles/home.module.scss"

import { useRef, useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import React from "react";


import NavBar from "../components/NavBar"
import Animation from "../components/Animation/index"
import CardsTech from "../components/CardsTech"
import Button from "../components/Button"
import CardsProjects from "../components/CardsProjects"


import useDocumentTitle from "../hooks/useDocumentTitle"
import useFavicon from "../hooks/useFavicon"
import useIsMobile from "../hooks/useIsMobile";

import Icone from "../imgs/icone.png"
import ImagemPessoal from "../imgs/imagemPessoal.jpeg"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons"
import { faLinkedin, faWhatsapp } from "@fortawesome/free-brands-svg-icons"

import { HabilidadesData } from "../data/HabilidadesData"
import { ProjetosData } from "../data/ProjetosData"

import curriculum from "../download/Currículo.pdf"
import ExperienceCard from "../components/CardsExperience";

import experiencia01 from "../imgs/experiencia01.png"
import experiencia02 from "../imgs/experiencia02.jpg"
import experiencia03 from "../imgs/experiencia03.jpg"



export default function Home() {

    useDocumentTitle("Felipe Pereira - Portifolio")
    useFavicon(Icone)

    const isMobile = useIsMobile();

    useEffect(() => {
        AOS.init({
            duration: 1200,
        });
    }, []);

    const homeRef = useRef(null)
    const sobreRef = useRef(null);
    const experienciasRef = useRef(null)
    const habilidadesRef = useRef(null);
    const trabalhosRef = useRef(null);
    const contatoRef = useRef(null)

    const scrollToSection = (ref: React.RefObject<HTMLDivElement>): void => {
        if (ref.current) {
            const offset = 80;
            const topPosition = ref.current.offsetTop - offset;

            window.scrollTo({
                top: topPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <>
            <div className={styles.main}>
                <NavBar scrollToSection={scrollToSection} refs={{ homeRef, sobreRef, habilidadesRef, trabalhosRef, contatoRef, experienciasRef }} data-aos={isMobile ? "fade-up" : "fade-down"}></NavBar>

                <section className={styles.secaoInicial} ref={homeRef} data-aos="fade-up">
                    <div className={styles.secaoInicial_Esquerda} data-aos={isMobile ? "fade-up" : "fade-right"}>
                        <img src={ImagemPessoal} alt="Imagem pessoal" className={styles.imagemPessoal} />
                    </div>
                    <div className={styles.secaoInicial_Direita} data-aos={isMobile ? "fade-up" : "fade-left"}>
                        <h3 className={styles.subtitulo} data-aos="zoom-in">Software Engineer</h3>
                        <h2 className={styles.titulo} data-aos="zoom-in">Felipe Augusto Pereira</h2>
                        <p className={styles.descricao} data-aos="fade-up">Meu nome é Felipe, sou estudante do curso de Engenharia de Software na Puc Minas. Tenho grande interesse por tecnologia e sou um entusiasta da programação, sempre buscando aprender mais e me aprofundar nessa área.</p>
                        <div className={styles.secaoInicial_btnsContainer} data-aos="fade-up">
                            <a className={styles.btnCurriculum} href={curriculum} download="Curriculo_Felipe_Pereira.pdf" data-aos="zoom-in">
                                <FontAwesomeIcon icon={faDownload} className={styles.iconeDowload} />
                                <a className={styles.btnText}>Baixar Curriculum</a>
                            </a>
                            <button className={styles.btnContato} data-aos="zoom-in" onClick={() => scrollToSection(contatoRef)}>
                                <a className={styles.btnText}>Contato</a>
                            </button>
                        </div>
                    </div>
                </section>

                <section className={styles.secaoSobre} ref={sobreRef} data-aos="fade-up">
                    <div className={styles.tituloSecao} data-aos={isMobile ? "fade-up" : "fade-right"}>
                        <h2 className={styles.titulo}>Sobre Mim</h2>
                    </div>
                    <div className={styles.secaoSobre_Content}>
                        <div className={styles.secaoSobre_Esquerda} data-aos={isMobile ? "fade-up" : "fade-right"}>
                            <p>Meu nome é Felipe Sousa, estou cursando o terceiro período de Engenharia de Software na PUC Minas, onde estou desenvolvendo uma base sólida em programação e tecnologias inovadoras.</p>
                            <p>Tenho experiência com linguagens como Java, JavaScript e Sass, e frameworks como React, além de estar constantemente aprimorando minhas habilidades em desenvolvimento de sistemas e automação.</p>
                            <p>Minha jornada acadêmica e profissional é impulsionada por desafios, colaboração em equipe e pela busca por resultados impactantes. Estou motivado a contribuir para projetos que unam criatividade e tecnologia, transformando ideias em soluções reais.</p>
                        </div>
                        <div className={styles.secaoSobre_Direita} data-aos={isMobile ? "fade-up" : "fade-left"}>
                            <Animation url={"https://assets9.lottiefiles.com/packages/lf20_m9lwcxrc.json"} />
                        </div>
                    </div>
                </section>

                <section className={styles.secaoExperiencias} data-aos="fade-up" ref={experienciasRef} >
                    <div className={styles.tituloSecao} style={{ marginTop: "0rem" }} data-aos={isMobile ? "fade-up" : "fade-right"}>
                        <h2 className={styles.titulo}>Experiências</h2>
                    </div>
                    <div className={styles.secaoExperiencias_Content}>
                    <ExperienceCard
                        date="2024"
                        title="Freelancer - Desenvolvimento Web"
                        description="Desenvolvi uma página web personalizada para um cliente, utilizando React, TypeScript e Tailwind."
                        image={experiencia01}
                        duration="2000"
                    />
                    <ExperienceCard
                        date="Primeiro Semestre 2024"
                        title="Projeto Destaque - Primeiro Semestre"
                        description="Fui premiado com o Melhor Projeto Interdisciplinar do Primeiro Período e o Segundo Melhor Projeto Interdisciplinar entre todos os períodos do curso de Engenharia de Software."
                        image={experiencia02}
                        duration="3000"
                    />
                    <ExperienceCard
                        date="Segundo Semestre 2024"
                        title="Projeto Destaque - Segundo Semestre"
                        description="Recebi reconhecimento com o Melhor Projeto Interdisciplinar do Segundo Período e novamente o Segundo Melhor Projeto Interdisciplinar entre todos os períodos do curso de Engenharia de Software."
                        image={experiencia03}
                        duration="4000"
                    />
            </div>
        </section >

                <section className={styles.secaoHabilidades} ref={habilidadesRef} data-aos="fade-up">
                    <div className={styles.tituloSecao} style={{ marginTop: "4rem" }} data-aos={isMobile ? "fade-up" : "fade-right"}>
                        <h2 className={styles.titulo}>Habilidades</h2>
                    </div>
                    <div className={styles.cardsContainer} data-aos="zoom-in">
                        <CardsTech items={HabilidadesData} />
                    </div>
                </section>

                <section className={styles.secaoPortifolio} ref={trabalhosRef} data-aos="fade-up">
                    <div className={styles.tituloSecao} data-aos={isMobile ? "fade-up" : "fade-right"}>
                        <h2 className={styles.titulo}>Portifolio</h2>
                    </div>
                    <div className={styles.cardsContainer} data-aos="zoom-in">
                        <CardsProjects items={ProjetosData} />
                    </div>
                </section>

                <section className={styles.secaoContato} ref={contatoRef} data-aos="fade-up">
                    <div className={styles.tituloSecao} data-aos={isMobile ? "fade-up" : "fade-right"}>
                        <h2 className={styles.titulo}>Contato</h2>
                    </div>
                    <div className={styles.secaoContato_Content}>
                        <div className={styles.secaoContato_Esquerda} data-aos={isMobile ? "fade-up" : "fade-right"}>

                            <div className={styles.contatoEmailContainer} data-aos="fade-up">
                                <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
                                <p>Email: felipeaps0918@gmail.com</p>
                            </div>
                            <div className={styles.contatoTelefoneContainer} data-aos="fade-up">
                                <FontAwesomeIcon icon={faPhone} className={styles.icon} />
                                <p>Telefone: +55 (31) 97131-6645</p>
                            </div>
                            <div className={styles.btnContainer} data-aos="zoom-in" >
                                <a
                                    href="https://wa.me/5531971316645"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button label="Enviar Mensagem" icon={faWhatsapp} />
                                </a>
                                  <a href="https://www.linkedin.com/in/felipe-sousa-974004210/"
                                target="_blank"
                                rel="noopener noreferrer"
                                >
                                    <Button label="Acessar Linkedin" icon={faLinkedin}></Button>
                                </a>
                            </div>
                            <div className={styles.btnContainer} data-aos="zoom-in" >
                              
                            </div>
                        </div>
                        {/*
            <div className={styles.secaoContato_Direita} data-aos="fade-left">
                <Forms></Forms>
            </div>*/}
                    </div>
                </section>
            </div >
        </>
    )
}


