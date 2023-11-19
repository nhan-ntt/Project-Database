# import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI, Path, Query

# Load environment variables from .env file
load_dotenv()

app = FastAPI()


@app.get("/")
async def index():
    return {"message": "Helldsfasasfdo"}


@app.get("/hello")
async def hello(name: str, age: int):
    return {"name": name, "age": age}

#
# @app.get("/hello/{name}")
# async def hello(name: str = Path(..., min_length=4, max_length=10)):
#     return {"name": name}
#
#
# @app.get("/hello/{name}/{age}")
# async def hello(*, name: str = Path(..., min_length=3, max_length=10),
#       age: int = Path(..., ge=1, le=100),
#                 percent:float=Query(..., ge=0, le=100)):
#     return {"name": name, "age": age, "percent": percent}
