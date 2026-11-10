import os
from dotenv import load_dotenv

load_dotenv()

class Email:
    def __init__(self, smtp_server='smtp.gmail.com', smtp_port=587):
        self.sender =  os.getenv('email')
        self.password = os.getenv('password')
        self.server = smtp_server
        self.port = smtp_port
    
    
