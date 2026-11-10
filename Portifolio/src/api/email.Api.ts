
import API_URL from "./apiURL";

export async function sendEmail(nome: string, email: string, telefone: string, mensagem: string){
    const response = await fetch(`${API_URL}/email/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient: "felipeaps0918@gmail.com",
          subject: `Olá, sou ${nome} de email: ${email} com telefone: ${telefone}`,
          body: `${mensagem}`,
        }),
    });

    return response;
}