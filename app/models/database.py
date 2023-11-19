import os
import urllib.parse

from dotenv import load_dotenv
from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.automap import automap_base

# Load environment variables from .env file
load_dotenv()

# Get database credentials from environment variables

db_user = os.getenv("DB_USER")
db_password = urllib.parse.quote_plus(os.getenv("DB_PASSWORD"))
db_host = os.getenv("DB_HOST")
db_name = os.getenv("DB_NAME")


print(db_user, db_password, db_host, db_name)

# SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://user:password@localhost/your_database_name"
# SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://{db_user}:{db_password} @{db_host}/{db_name}"
SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://{}:{}@{}/{}".format(db_user, db_password, db_host, db_name)

engine = create_engine(SQLALCHEMY_DATABASE_URL)

meta = MetaData()
Base = automap_base()
Base.prepare(autoload_with=engine)

Semester = Base.classes.semester
TakeClass = Base.classes.takeclass
Student = Base.classes.student
CourseClass = Base.classes.courseclass
Major = Base.classes.major
SubjectClass = Base.classes.subjectclass
Subject = Base.classes.subject

# Check the connection
try:
    connection = engine.connect()
    print("Connection successful!")
    connection.close()
except Exception as e:
    print(f"Error connecting to the database: {e}")