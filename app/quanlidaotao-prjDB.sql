drop database if exists projectdb_quanlidaotao;
create database projectdb_quanlidaotao;
use projectdb_quanlidaotao;
SET NAMES 'utf8mb4';

CREATE TABLE `semester` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `year_start` int not null,
  `term` int not null
);


CREATE TABLE `takeClass` (
  `student_id` int not null,
  `subject_class_id` int not null,
  `gpa` double,
  `status` varchar(255),
  primary key (student_id, subject_class_id)
);


CREATE TABLE `student` (
  `id` int not null PRIMARY KEY,
  `name` varchar(255) not null ,
  `date_of_birth` date not null,
  `course_class_id` int not null
);

CREATE TABLE `courseClass` (
  `id` int not null PRIMARY KEY AUTO_INCREMENT,
  `major_id` int not null,
  `gen` varchar(10) not null
);


CREATE TABLE `major` (
  `id` int not null PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `code` varchar(255) not null,
  `name` varchar(255) not null
);


CREATE TABLE `subjectClass` (
  `id` int not null PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `subject_id` int not null,
  `semester_id` int not null,
  `class_index` int not null,
  `room` varchar(255) not null,
  `start_time` time not null,
  `end_time` time not null,
  `week_day` varchar(255) not null
);

CREATE TABLE `subject` (
  `id` int PRIMARY KEY not null NOT NULL AUTO_INCREMENT,
  `subject_code` varchar(255) not null,
  `credit` int not null,
  `subject_name` varchar(255) not null
);


ALTER TABLE `courseClass` ADD FOREIGN KEY (`major_id`) REFERENCES `major` (`id`);

ALTER TABLE `student` ADD FOREIGN KEY (`course_class_id`) REFERENCES `courseClass` (`id`);

ALTER TABLE `subjectClass` ADD FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`);

ALTER TABLE `subjectClass` ADD FOREIGN KEY (`semester_id`) REFERENCES `semester` (`id`);

ALTER TABLE `takeClass` ADD FOREIGN KEY (`subject_class_id`) REFERENCES `subjectClass` (`id`);

ALTER TABLE `takeClass` ADD FOREIGN KEY (`student_id`) REFERENCES `student` (`id`);


-- Nhập dữ liệu cho bảng semester
INSERT INTO semester (year_start, term) VALUES
(2021, 1),
(2021, 2),
(2022, 1),
(2022, 2),
(2023, 1),
(2023, 2);

-- Nhập dữ liệu cho bảng major
INSERT INTO major (code, name) VALUES
('CN1', 'Công nghệ thông tin'),
('CN2', 'Kỹ thuật máy tính'),
('CN3', 'Khoa học máy tính'),
('CN4', 'Hệ thống thông tin'),
('CN5', 'Kỹ thuật phần mềm'),
('CN6', 'Mạng máy tính'),
('CN7', 'Trí tuệ nhân tạo'),
('CN8', 'An toàn thông tin'),
('CN9', 'Quản trị dự án'),
('CN10', 'Thương mại điện tử');

-- Nhập dữ liệu cho bảng courseClass
INSERT INTO courseClass (major_id, gen) VALUES
(1, 'K67'),
(2, 'K68'),
(3, 'K69');

-- Nhập dữ liệu cho bảng subject
INSERT INTO subject (subject_code, credit, subject_name) VALUES
('INT01', 3, 'Lập trình cơ bản'),
('INT02', 4, 'Cấu trúc dữ liệu và giải thuật'),
('INT03', 3, 'Hệ điều hành'),
('INT04', 3, 'Cơ sở dữ liệu'),
('INT05', 4, 'Phân tích và thiết kế hệ thống'),
('INT06', 3, 'Mạng máy tính'),
('INT07', 4, 'Trí tuệ nhân tạo'),
('INT08', 3, 'An toàn thông tin'),
('INT09', 3, 'Quản trị dự án'),
('INT10', 4, 'Thương mại điện tử');

-- Nhập dữ liệu cho bảng subjectClass
INSERT INTO subjectClass (subject_id, semester_id, class_index, room, start_time, end_time, week_day) VALUES
(1, 1, 1, 'G2-101', '08:00:00', '10:00:00', 'Thứ 2'),
(2, 1, 2, 'G2-202', '10:30:00', '12:30:00', 'Thứ 3'),
(3, 2, 1, 'GĐ3-303', '13:30:00', '15:30:00', 'Thứ 4'),
(4, 2, 2, 'GĐ4-404', '08:00:00', '10:00:00', 'Thứ 5'),
(5, 3, 1, 'GĐ5-505', '10:30:00', '12:30:00', 'Thứ 6'),
(6, 3, 2, 'GĐ6-606', '13:30:00', '15:30:00', 'Thứ 7'),
(7, 2, 1, 'GĐ7-707', '08:00:00', '10:00:00', 'Chủ nhật'),
(8, 3, 2, 'GĐ8-808', '10:30:00', '12:30:00', 'Thứ 2'),
(9, 1, 1, 'GĐ9-909', '13:30:00', '15:30:00', 'Thứ 3'),
(10, 3, 2, 'GĐ10-1010', '08:00:00', '10:00:00', 'Thứ 4');

-- Nhập dữ liệu cho bảng student
INSERT INTO student (id, name, date_of_birth, course_class_id) VALUES
(22020001, 'Nguyễn Văn A', '2000-01-01', 1),
(22020002, 'Trần Thị B', '2001-02-02', 2),
(22020003, 'Lê Văn C', '2002-03-03', 3),
(22020004, 'Phạm Thị D', '2003-04-04', 2),
(22020005, 'Hoàng Văn E', '2004-05-05', 1),
(22020006, 'Vũ Thị F', '2005-06-06', 3),
(22020007, 'Đặng Văn G', '2006-07-07', 2),
(22020008, 'Trương Thị H', '2007-08-08', 3),
(22020009, 'Lý Văn I', '2008-09-09', 1),
(22020010, 'Ngô Thị K', '2009-10-10', 1);

-- Nhập dữ liệu cho bảng takeClass
INSERT INTO takeClass (student_id, subject_class_id, gpa, status) VALUES
(22020001, 1, 3.5, 'Đã hoàn thành'),
(22020001, 2, 4.0, 'Đã hoàn thành'),
(22020002, 1, null, 'Chưa hoàn thành'),
(22020002, 3, 3.0, 'Đã hoàn thành'),
(22020003, 2, null, 'Chưa hoàn thành'),
(22020003, 4, 3.0, 'Đã hoàn thành'),
(22020004, 3, null, 'Chưa hoàn thành'),
(22020004, 5, 3.5, 'Đã hoàn thành'),
(22020005, 4, null, 'Chưa hoàn thành'),
(22020005, 6, 2.5, 'Đã hoàn thành');