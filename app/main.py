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
    return crud.get_subject(db, subject_id)

#get infomarion of portal from student_id
@app.get("/qldt")
def qldt(student_id: int | None = None ,
         student_name: str | None = None, date_of_birth: datetime | None = None,
         course_class_code: str | None = None, subject_class_id: int | None = None,
         subject_code: str | None = None, subject_name: str | None = None,
         credit: int | None = None, limit_number: int | None = None, semester_id: int | None = None):
    return crud.get_qldt(db, student_id, student_name,
                         date_of_birth, course_class_code, subject_class_id,
                         subject_code, subject_name, credit, limit_number, semester_id)
# @app.get("/portalrieng")
# def qldt2(student_id: int | None = None):
#     return crud.get_in4(db, student_id)