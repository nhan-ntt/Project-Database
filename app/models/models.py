from database import (Semester, TakeClass, Student, CourseClass, Major, SubjectClass, Subject,
                      engine)
from sqlalchemy.orm import sessionmaker

Session = sessionmaker(bind=engine)
session = Session()
#
# stu = Student(id = 123453, name = "nhan", date_of_birth = "2004-11-19", course_class_id = 3)
#
# session.add(stu)
# session.commit()

result = session.query(Major).all()

for row in result:
    print(row.name, row.code)



