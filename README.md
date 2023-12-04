# Project-Database 
pls read readme /(ㄒoㄒ)/~~
1. setup
    ```
    pip install -r requirements.txt
    ```
1. create .env file
    ```
    DB_USER=root
    DB_PASSWORD=your_password
    DB_HOST=localhost
    DB_NAME=projectdb_quanlidaotao
   
2. open MYSQL command line client 
    ```
   source pathtofile/quanlidaotao-prjDB.sql;
   source pathtofile/data.sql;

3. cmd
   ```
   python add1.py
   python add2.py
   ```
4. run web
   ```
   cd app
   uvicorn main:app --reload
   python -m http.server 5501
   ```
5. open browser
   ```http://127.0.0.1:5501/```

4. Database có vấn đề. Lúc add sinh viên phải lưu ý course_clasa_id phải tồn tại

6. db không có vấn đề đâu, thử lại đi
