from container import chatController
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from anyio import from_thread

apiRouter = APIRouter()

class ChatAskRequest(BaseModel):
    question: str
    prompt: str | None = None

class ChatAnswer(BaseModel):
    answer: str

@apiRouter.post("/chat/ask")
async def ask(body: ChatAskRequest):

    try:
        answer = await chatController.get_response(body.question, body.prompt)  # CERTO
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
