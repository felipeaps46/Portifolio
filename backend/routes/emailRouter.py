from container import emailController
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr

apiRouter = APIRouter()

class EmailRequest(BaseModel):
    recipient: EmailStr
    subject: str
    body: str

class EmailResponse(BaseModel):
    message: str

@apiRouter.post("/email/send", response_model=EmailResponse)
def send_email(body: EmailRequest):
    try:
        result = emailController.sendEmail(body)  
        return result
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))