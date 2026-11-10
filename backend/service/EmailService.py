import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from model.Email import Email
from repository.EmailRepository import EmailRepository

class EmailService(EmailRepository):
    def __init__(self, email_config: Email):
        self.email_config = email_config

    def createEmail(self, recipient: str, subject: str, body: str):
        msg = MIMEMultipart()
        msg['From'] = self.email_config.sender
        msg['To'] = recipient
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain', 'utf-8'))
        return msg

    def send_email(self, recipient: str, subject: str, body: str):
        
        msg = self.createEmail(recipient, subject, body)
        try:
            with smtplib.SMTP(self.email_config.server, self.email_config.port) as server:
                server.starttls()
                server.login(self.email_config.sender, self.email_config.password)
                server.sendmail(self.email_config.sender, recipient, msg.as_string())
            return True, "E-mail enviado com sucesso"
        except Exception as e:
            return False, str(e)