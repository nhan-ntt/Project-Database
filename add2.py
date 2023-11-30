import pandas as pd
import mysql.connector

# MySQL Connection Parameters
mysql_config = {
    'host': 'localhost',
    'port': 3307,  # Your MySQL server port
    'user': 'root',
    'password': 'ngocanh5624',
    'database': 'projectdb_quanlidaotao',
}

dfTake = pd.read_csv('app/takeclass.csv')
dfTake.replace('', pd.NA, inplace=True)

# Connect to MySQL
conn = mysql.connector.connect(**mysql_config)

# Create a cursor object
cursor = conn.cursor()

# Insert DataFrame into MySQL for takeClass
for index, row in dfTake.iterrows():
    insert_query = """
        INSERT INTO takeClass
        (student_id, subject_class_id, gpa, status)
        VALUES (%s, %s, %s, %s)
    """
    values = (
        row['student_id'] if pd.notna(row['student_id']) else None,
        row['subject_class_id'] if pd.notna(row['subject_class_id']) else None,
        row['gpa'] if pd.notna(row['gpa']) else None,
        row['status'] if pd.notna(row['status']) else None
    )
    cursor.execute(insert_query, values)

# Commit changes and close connections
conn.commit()
cursor.close()
conn.close()
