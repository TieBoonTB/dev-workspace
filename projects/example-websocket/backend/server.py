# Standard library
import base64
import io

# Third-party libraries
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image

app = FastAPI()

# Allow Angular frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/hello")
def read_hello():
    return {"message": "Hello from FastAPI backend!"}

@app.websocket("/ws/stream")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("WebSocket connected")
    try:
        while True:
            data = await websocket.receive_text()
            image_data = data.split(",")[1]
            img_bytes = base64.b64decode(image_data)
            image = Image.open(io.BytesIO(img_bytes))
            print("Frame received")
    except Exception as e:
        print("WebSocket disconnected:", e)