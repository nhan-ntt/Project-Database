from sqlalchemy.orm import Session
import models
from datetime import datetime
from sqlalchemy import func,asc


def get_subject(db: Session, subject_id: int):
    return db.query(models.Subject).filter(models.Subject.id == subject_id).all()


def get_in4_student(db: Session, student_id: int):
    query = (
        db.query(
            models.Student.id,
            models.Student.name,
            models.Student.date_of_birth,
            func.concat("K", models.CourseClass.gen, "-", models.Major.code).label('course_class_name'),
            (func.sum(models.TakeClass.gpa * models.Subject.credit) / func.sum(models.TakeClass.gpa)).label('weighted_gpa')
        )
        .join(models.TakeClass, models.Student.id == models.TakeClass.student_id)
        .join(models.SubjectClass, models.SubjectClass.id == models.TakeClass.subject_class_id)
        .join(models.Subject, models.Subject.id == models.SubjectClass.id)
        .join(models.Semester, models.Semester.id == models.SubjectClass.semester_id)
        .join(models.CourseClass, models.CourseClass.id == models.Student.course_class_id)
        .join(models.Major, models.Major.id == models.CourseClass.major_id)
        .filter(
            models.Student.id == student_id,
            models.TakeClass.status != "In Process"  # Thêm điều kiện này để loại bỏ các bản ghi có status là "InProcess"
        )
        .group_by(
            models.Student.id,
            models.Student.name,
            models.Student.date_of_birth,
            'course_class_name'
        )
    )
    result = query.first()
    return result
def delete_subject(db: Session, student_id: int, subject_class_id: int):
    query = (
        db.query(models.TakeClass)
        .filter(
            models.TakeClass.student_id == student_id,
            models.TakeClass.subject_class_id == subject_class_id
        )
    )
    result = query.delete()
    db.commit()
    return result
def sign_subject(db: Session, student_id: int, subject_class_id: int=None):
    # Kiểm tra xem dòng đã tồn tại chưa
    existing_takeclass = db.query(models.TakeClass).filter_by(student_id=student_id, subject_class_id=subject_class_id).first()

    if existing_takeclass:
        # Dòng đã tồn tại, có thể xử lý theo ý muốn của bạn, ví dụ: thông báo lỗi hoặc trả về thông tin đã tồn tại
        return "Bản ghi đã tồn tại trong CSDL"
 
    # Dòng chưa tồn tại, thêm mới
    takeclass = models.TakeClass(student_id=student_id, subject_class_id=subject_class_id)
    db.add(takeclass)

    
    db.commit()
    return takeclass

def get_ctdt(db: Session):
    result=db.query( models.Subject).all()
    return result
  