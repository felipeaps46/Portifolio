import emailjs from "emailjs-com";
import styles from "./styles.module.scss";
import Button from "../Button";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Contato = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    emailjs
      .sendForm(
        "service_kow44uj", // Substitua pelo seu Service ID
        "template_fdhjj4i", // Substitua pelo seu Template ID
        form,
        "f-X2UsoNzcKMUthQ9" // Substitua pela sua chave de usuário
      )
      .then(
        (result) => {
          console.log("Email enviado com sucesso: ", result.text);
          alert("Mensagem enviada com sucesso!");
        },
        (error) => {
          console.log("Erro ao enviar o email: ", error.text);
          alert("Houve um erro ao enviar sua mensagem.");
        }
      );
  };

  return (
    <div className={styles.contatoContainer}>
      <section className={styles.contatoContent}>
        <div className={styles.contatoCard}>
          <h2 className={styles.contatoTitle}>Entre em Contato</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.contatoFields}>

              <div className={styles.contatoGroup}>
                <label htmlFor="formEmail">Email</label>
                <input type="email" id="formEmail" name="email" placeholder="Digite seu email" required />
              </div>

              <div className={styles.contatoGroup}>
                <label htmlFor="formMessage">Mensagem</label>
                <textarea id="formMessage" name="message" rows="3" placeholder="Digite sua mensagem" required></textarea>
              </div>
            </div>
            <div className={styles.btnContainer}>
              <Button label="Enviar email" onBtnClick={() => handleSubmit} icon={faEnvelope}>

              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contato;
