from repository.ChatRepository import ChatRepository

class ChatController:
    def __init__(self, chat_service: ChatRepository):
        self.chat_service = chat_service

    async def get_response(self, question, prompt=None):
        return await self.chat_service.get_response(question, prompt)
    
