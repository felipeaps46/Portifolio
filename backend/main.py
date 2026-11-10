from fastapi import FastAPI
from routes.emailRouter import apiRouter as emailRouter
from routes.chatRouter import apiRouter as chatRouter
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(emailRouter)
app.include_router(chatRouter)

@app.get("/health")
def health():
    return {"status": "ok"}
