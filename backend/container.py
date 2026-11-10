from service.EmailService import EmailService
from model.Email import Email
from controller.EmailController import EmailController
from service.ChatService import ChatService
from controller.ChatController import ChatController


emailService = EmailService(Email())
emailController = EmailController(emailService)

chatService = ChatService()
chatController = ChatController(chatService)
