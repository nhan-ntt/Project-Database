from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

import crud
from database import SessionLocal, engine
from datetime import datetime
from typing import Union

from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from pydantic import BaseModel

app = FastAPI()
db=SessionLocal()
        
@app.get("/subject/{subject_id}")
def get_subject(subject_id: int):
    return crud.get_subject(db, subject_id=subject_id)

