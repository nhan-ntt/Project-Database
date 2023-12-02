from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

import crud
from database import SessionLocal, engine
from datetime import date
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
    allow_origins=origins,  # Cho phép tất cả các nguồn
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/subject/{subject_id}")
def get_subject(subject_id: int):
    return crud.get_subject(db, subject_id)

#get infomarion of portal from student_id
@app.get("/qldt")
def qldt(student_id: int | None = None ,student_name: str | None = None, 
         date_of_birth: date | None = None, course_class_code: str | None = None, subject_class_id: int | None = None,
         subject_code: str | None = None, subject_name: str | None = None,
         credit: int | None = None,semester_id: int| None = None):
    return crud.get_qldt(db, student_id, student_name,
                         date_of_birth, course_class_code,
                         subject_class_id, subject_code,
                         subject_name, credit, semester_id)
    
@app.delete("/portalrieng/subject")
def remove_subject(student_id: int, subject_class_id: int):
    return crud.delete_subject(db, student_id, subject_class_id)
@app.delete("/portalrieng/student")
def remove_student(student_id: int):
    return crud.delete_student(db, student_id)
@app.get("/portalrieng")
def in4_student(student_id: int):
    return crud.get_in4_student(db, student_id)
@app.get("/portalrieng/subject")
def list_subject_rieng(student_id: int):
    return crud.get_list_subject_rieng(db, student_id)

@app.get("/portalchung")
def ctdt():
    return crud.get_ctdt(db)
@app.get("/dangkyhoc")
def ListSubject():
    return crud.get_listsubject(db)
@app.post("/dangkyhoc")
def add_subject(student_id: int, subject_class_id: int):
    return crud.sign_subject(db, student_id, subject_class_id)
@app.post("/addNewStudent")
def add_student(student_id: int, student_name: str, date_of_birth: date, course_class_gen: int,major_name: str,major_code: str):
    return crud.add_student(db, student_id, student_name, date_of_birth, course_class_gen, major_name, major_code)
@app.put("/editStudent")
def update_inforStudent(student_id: int, student_name: str, date_of_birth: date):
    return crud.update_inforStudent(db, student_id, student_name, date_of_birth)
@app.put("/editScore")
def update_score(student_id: int, subject_class_id: int, gpa: float):
    return crud.update_score(db, student_id, subject_class_id, gpa)