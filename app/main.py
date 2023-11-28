from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

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
       
origins = ["http://127.0.0.1:5501"]  # Add the origin of your frontend application
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.get("/subject/{subject_id}")
def get_subject(subject_id: int):
    return crud.get_subject(db, subject_id)

#get infomarion of portal from student_id
@app.get("/qldt")
def qldt(student_id: int | None = None ,student_name: str | None = None, 
         date_of_birth: datetime | None = None, course_class_code: str | None = None, subject_class_id: int | None = None,
         subject_code: str | None = None, subject_name: str | None = None,
         credit: int | None = None, limit_number: int | None = None, 
         semester_term: int | None = None, semester_yearstart: int| None = None):
    return crud.get_qldt(db, student_id, student_name,
                         date_of_birth, course_class_code,
                         subject_class_id, subject_code,
                         subject_name, credit, limit_number,
                         semester_term, semester_yearstart)
    
@app.delete("/portalrieng")
def remove_subject(student_id: int, subject_class_id: int):
    return crud.delete_subject(db, student_id, subject_class_id)

@app.get("/portalrieng")
def in4_student(student_id: int):
    return crud.get_in4_student(db, student_id)

@app.post("/portalrieng")
def add_subject(student_id: int, subject_class_id: int):
    return crud.sign_subject(db, student_id, subject_class_id)