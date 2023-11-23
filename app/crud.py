from sqlalchemy.orm import Session
import models
from datetime import datetime
from sqlalchemy import func,asc


def get_subject(db: Session, subject_id: int):
    return db.query(models.SubjectClass).filter(models.SubjectClass.id == subject_id).all()


def get_qldt(
    db: Session, student_id: int = None, 
    student_name: str = None, date_of_birth: datetime = None,
    course_class_code: str = None, subject_class_id: int = None,
    subject_code: str = None, subject_name: str = None, credit: int = None,
    limit_number: int = None, semester_id: int = None):
    query = (
        db.query(models.Student.id, models.Student.name, models.Student.date_of_birth,
                func.concat("K",models.CourseClass.gen, "-", models.Major.code).label('course_class_name'),
                 models.Subject.subject_code, models.Subject.subject_name,
                 models.Subject.credit)
        .join(models.TakeClass, models.Student.id == models.TakeClass.student_id)
        .join(models.SubjectClass, models.SubjectClass.id == models.TakeClass.subject_class_id)
        .join(models.Subject, models.Subject.id == models.SubjectClass.id)
        .join(models.Semester, models.Semester.id == models.SubjectClass.semester_id)
        .join(models.CourseClass, models.CourseClass.id == models.Student.course_class_id)
        .join(models.Major, models.Major.id == models.CourseClass.major_id)
        .filter(
            models.Student.id == student_id if student_id is not None else models.Student.id.isnot(None),
            models.Semester.id == semester_id if semester_id is not None else models.Semester.id.isnot(None),
            models.Student.name == student_name if student_name is not None else models.Student.name.isnot(None),
            models.Student.date_of_birth == date_of_birth if date_of_birth is not None else models.Student.date_of_birth.isnot(None),
           # models.Student.course_class_code == course_class_code if course_class_code is not None else models.Student.course_class_code.isnot(None),
            func.concat("K",models.CourseClass.gen, "-", models.Major.code).label('course_class')== course_class_code if course_class_code is not None 
            else models.Major.isnot(None),

            models.SubjectClass.id == subject_class_id if subject_class_id is not None else models.SubjectClass.id.isnot(None),
            models.Subject.subject_code == subject_code if subject_code is not None else models.Subject.subject_code.isnot(None),
            models.Subject.subject_name == subject_name if subject_name is not None else models.Subject.subject_name.isnot(None),
            models.Subject.credit == credit if credit is not None else models.Subject.credit.isnot(None)
        ).order_by(
            asc(models.Student.id),
            asc(models.Student.name), 
            asc(models.Student.date_of_birth),
            asc('course_class_name'),
            asc(models.SubjectClass.id),
            asc(models.Subject.subject_code), 
            asc(models.Subject.subject_name),
            asc(models.Subject.credit) 
        ).limit(limit_number)
    )
    result = query.all()
    return result

