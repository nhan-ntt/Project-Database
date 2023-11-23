from sqlalchemy.ext.automap import automap_base
from database import ( engine)
from sqlalchemy.orm import sessionmaker

Base = automap_base()
Base.prepare(autoload_with=engine)

Semester = Base.classes.semester
TakeClass = Base.classes.takeclass
Student = Base.classes.student
CourseClass = Base.classes.courseclass
Major = Base.classes.major
SubjectClass = Base.classes.subjectclass
Subject = Base.classes.subject

Session = sessionmaker(bind=engine)
session = Session()
#
# stu = Student(id = 123453, name = "nhan", date_of_birth = "2004-11-19", course_class_id = 3)
#
# session.add(stu)
# session.commit()