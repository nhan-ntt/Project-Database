from sqlalchemy.orm import Session
import models
from datetime import datetime
from sqlalchemy import func,asc


def get_subject(db: Session, subject_id: int):
    return db.query(models.Subject).filter(models.Subject.id == subject_id).all()


def get_qldt(
    db: Session, student_id: int = None, 
    student_name: str = None, date_of_birth: datetime = None,
    course_class_code: str = None, subject_class_id: int = None,
    subject_code: str = None, subject_name: str = None,
    credit: int = None, semester_id: int = None):
    #semester_id=db.query(models.Semester.id).filter(semester_term==models.Semester.term,semester_yearstart==models.Semester.year_start).first()
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
            #func.concat("K",models.CourseClass.gen, "-", models.Major.code).label('course_class')== course_class_code if course_class_code is not None else models.Major.isnot(None),

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
        )
    )
    result = query.all()
    return result

def get_in4_student(db: Session, student_id: int):
    query = (
        db.query(
            models.Student.id,
            models.Student.name,
            models.Student.date_of_birth,
            func.concat("K", models.CourseClass.gen, "-", models.Major.code).label('course_class_name'),
            (func.sum(models.Subject.credit * models.TakeClass.gpa) / func.sum(models.Subject.credit)).label('gpa')
        )
        .join(models.TakeClass, models.Student.id == models.TakeClass.student_id)
        .join(models.SubjectClass, models.SubjectClass.id == models.TakeClass.subject_class_id)
        .join(models.Subject, models.Subject.id == models.SubjectClass.id)
        .join(models.Semester, models.Semester.id == models.SubjectClass.semester_id)
        .join(models.CourseClass, models.CourseClass.id == models.Student.course_class_id)
        .join(models.Major, models.Major.id == models.CourseClass.major_id)
        .filter(
            models.Student.id == student_id
        )
    )
    result = query.all()
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
  