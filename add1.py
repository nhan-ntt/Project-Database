import pandas as pd
import mysql.connector

# MySQL Connection Parameters
mysql_config = {
    'host': 'localhost:3307',
    'user': 'root',
    'password': 'ngocanh5624',
    'database': 'projectdb_quanlidaotao',
}

# Load CSV into DataFrame
dfSubject = pd.read_csv('app/subjectclass.csv')

dfStudent = pd.read_csv('app/student.csv')
dfStudent['date_of_birth'] = pd.to_datetime(dfStudent['date_of_birth'], format='%d/%m/%Y').dt.strftime('%Y-%m-%d')

dfTake = pd.read_csv('app/takeclass.csv')
dfTake.replace('', pd.NA, inplace=True)

# Connect to MySQL
conn = mysql.connector.connect(**mysql_config)

# Create a cursor object
cursor = conn.cursor()

# Insert DataFrame into MySQL for subjectclass

for index, row in dfSubject.iterrows():
    insert_query = """
        INSERT INTO subjectclass
        (subject_id, semester_id, class_index, room, start_time, end_time, week_day)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """
    # Use a tuple to provide values to the query
    values = (
        row['subject_id'], row['semester_id'], row['class_index'],
        row['room'], row['start_time'], row['end_time'], row['week_day']
    )
    cursor.execute(insert_query, values)

# Insert DataFrame into MySQL for student
for index, row in dfStudent.iterrows():
    insert_query = """
        INSERT INTO student
        (id, name, date_of_birth, course_class_id)
        VALUES (%s, %s, %s, %s)
    """
    values = (
        row['id'] if pd.notna(row['id']) else None,
        row['name'] if pd.notna(row['name']) else None,
        row['date_of_birth'] if pd.notna(row['date_of_birth']) else None,
        row['course_class_id'] if pd.notna(row['course_class_id']) else None
    )
    cursor.execute(insert_query, values)

# # Insert DataFrame into MySQL for takeClass
# for index, row in dfTake.iterrows():
#     insert_query = """
#         INSERT INTO takeClass
#         (student_id, subject_class_id, gpa, status)
#         VALUES (%s, %s, %s, %s)
#     """
#     values = (
#         row['student_id'] if pd.notna(row['student_id']) else None,
#         row['subject_class_id'] if pd.notna(row['subject_class_id']) else None,
#         row['gpa'] if pd.notna(row['gpa']) else None,
#         row['status'] if pd.notna(row['status']) else None
#     )
#     cursor.execute(insert_query, values)

# Commit changes and close connections
conn.commit()
cursor.close()
conn.close()
