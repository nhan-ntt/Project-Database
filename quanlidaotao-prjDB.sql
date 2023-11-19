-- create database projectdb_quanlidaotao;
-- use projectdb_quanlidaotao;
-- drop database projectdb_quanlidaotao;


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
  `id` int not null PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `major_id` int not null,
  `gen` int not null
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


INSERT INTO `projectdb_quanlidaotao`.`semester` (`year_start`, `term`) VALUES ('2020', '1');
INSERT INTO `projectdb_quanlidaotao`.`semester` (`year_start`, `term`) VALUES ('2020', '2');
INSERT INTO `projectdb_quanlidaotao`.`semester` (`year_start`, `term`) VALUES ('2020', '3');
INSERT INTO `projectdb_quanlidaotao`.`semester` (`year_start`, `term`) VALUES ('2021', '1');
INSERT INTO `projectdb_quanlidaotao`.`semester` (`year_start`, `term`) VALUES ('2021', '2');
INSERT INTO `projectdb_quanlidaotao`.`semester` (`year_start`, `term`) VALUES ('2021', '3');
INSERT INTO `projectdb_quanlidaotao`.`semester` (`year_start`, `term`) VALUES ('2022', '1');
INSERT INTO `projectdb_quanlidaotao`.`semester` (`year_start`, `term`) VALUES ('2022', '2');
INSERT INTO `projectdb_quanlidaotao`.`semester` (`year_start`, `term`) VALUES ('2022', '3');
INSERT INTO `projectdb_quanlidaotao`.`semester` (`year_start`, `term`) VALUES ('2023', '1');
INSERT INTO `projectdb_quanlidaotao`.`semester` (`year_start`, `term`) VALUES ('2023', '2');
INSERT INTO `projectdb_quanlidaotao`.`semester` (`year_start`, `term`) VALUES ('2023', '3');
INSERT INTO `projectdb_quanlidaotao`.`semester` (`year_start`, `term`) VALUES ('2024', '1');
INSERT INTO `projectdb_quanlidaotao`.`semester` (`year_start`, `term`) VALUES ('2024', '2');
INSERT INTO `projectdb_quanlidaotao`.`semester` (`year_start`, `term`) VALUES ('2024', '3');


INSERT INTO `projectdb_quanlidaotao`.`major` (`code`, `name`) VALUES ('CN1', 'Công nghệ thông tin');
INSERT INTO `projectdb_quanlidaotao`.`major` (`code`, `name`) VALUES ('CN2', 'Kĩ thuật máy tính');
INSERT INTO `projectdb_quanlidaotao`.`major` (`code`, `name`) VALUES ('CN3', 'Vật lý kĩ thuật');
INSERT INTO `projectdb_quanlidaotao`.`major` (`code`, `name`) VALUES ('CN4', 'Cơ kĩ thuật');
INSERT INTO `projectdb_quanlidaotao`.`major` (`code`, `name`) VALUES ('CN5', 'Công nghệ kĩ thuật xây dựng');
INSERT INTO `projectdb_quanlidaotao`.`major` (`code`, `name`) VALUES ('CN6', 'Công nghệ kĩ thuật cơ điện tử');
INSERT INTO `projectdb_quanlidaotao`.`major` (`code`, `name`) VALUES ('CN7', 'Công nghệ hàng không vũ trụ');
INSERT INTO `projectdb_quanlidaotao`.`major` (`code`, `name`) VALUES ('CN8', 'Khoa học máy tính');
INSERT INTO `projectdb_quanlidaotao`.`major` (`code`, `name`) VALUES ('CN9', 'Công nghệ kĩ thuật Điện tử - Viễn thông');
INSERT INTO `projectdb_quanlidaotao`.`major` (`code`, `name`) VALUES ('CN10', 'Công nghệ nông nghiệp');
INSERT INTO `projectdb_quanlidaotao`.`major` (`code`, `name`) VALUES ('CN11', ' Kỹ thuật điều khiển và tự động hoá');
INSERT INTO `projectdb_quanlidaotao`.`major` (`code`, `name`) VALUES ('CN12', 'Trí tuệ nhân tạo');
INSERT INTO `projectdb_quanlidaotao`.`major` (`code`, `name`) VALUES ('CN13', 'Kỹ thuật năng lượng');
INSERT INTO `projectdb_quanlidaotao`.`major` (`code`, `name`) VALUES ('CN14', 'Hệ thống thông tin');
INSERT INTO `projectdb_quanlidaotao`.`major` (`code`, `name`) VALUES ('CN15', 'Mạng máy tính và truyền thông dữ liệu');
INSERT INTO `projectdb_quanlidaotao`.`major` (`code`, `name`) VALUES ('CN16', 'CNTT định hướng thị trường Nhật Bản');
INSERT INTO `projectdb_quanlidaotao`.`major` (`code`, `name`) VALUES ('CN17', 'Kỹ thuật Robot');

INSERT INTO `projectdb_quanlidaotao`.`student` (`id`, `name`, `date_of_birth`, `course_class_id`) VALUES ('1234', 'adf', '2004-11-19', '1');
INSERT INTO `projectdb_quanlidaotao`.`student` (`id`, `name`, `date_of_birth`, `course_class_id`) VALUES ('23', 'sgf', '2003-12-21', '2');
INSERT INTO `projectdb_quanlidaotao`.`student` (`id`, `name`, `date_of_birth`, `course_class_id`) VALUES ('2353', 'ssaf', '2003-12-21', '3');


INSERT INTO `projectdb_quanlidaotao`.`subject` (`subject_code`, `credit`, `subject_name`) VALUES ('INT1008', '4', 'Nhập môn lập trình');
INSERT INTO `projectdb_quanlidaotao`.`subject` (`subject_code`, `credit`, `subject_name`) VALUES ('INT1007', '3', 'GTCNTT');
INSERT INTO `projectdb_quanlidaotao`.`subject` (`subject_code`, `credit`, `subject_name`) VALUES ('INT2215', '4', 'Lập trình nâng cao');
INSERT INTO `projectdb_quanlidaotao`.`subject` (`subject_code`, `credit`, `subject_name`) VALUES ('INT2204', '4', 'Lập trình hướng đối tượng');


INSERT INTO `projectdb_quanlidaotao`.`courseclass` (`major_id`, `gen`) VALUES ('1', '67');
INSERT INTO `projectdb_quanlidaotao`.`courseclass` (`major_id`, `gen`) VALUES ('12', '67');
INSERT INTO `projectdb_quanlidaotao`.`courseclass` (`major_id`, `gen`) VALUES ('16', '67');
INSERT INTO `projectdb_quanlidaotao`.`courseclass` (`major_id`, `gen`) VALUES ('8', '67');
INSERT INTO `projectdb_quanlidaotao`.`courseclass` (`major_id`, `gen`) VALUES ('2', '66');
INSERT INTO `projectdb_quanlidaotao`.`courseclass` (`major_id`, `gen`) VALUES ('3', '66');
INSERT INTO `projectdb_quanlidaotao`.`courseclass` (`major_id`, `gen`) VALUES ('4', '66');
INSERT INTO `projectdb_quanlidaotao`.`courseclass` (`major_id`, `gen`) VALUES ('9', '68');
INSERT INTO `projectdb_quanlidaotao`.`courseclass` (`major_id`, `gen`) VALUES ('8', '68');
INSERT INTO `projectdb_quanlidaotao`.`courseclass` (`major_id`, `gen`) VALUES ('12', '68');

INSERT INTO `projectdb_quanlidaotao`.`subjectclass` (`subject_id`, `semester_id`, `class_index`, `room`, `start_time`, `end_time`, `week_day`) VALUES ('1', '3', '20', '301-G2', '8:00', '9:00', 'mon');
INSERT INTO `projectdb_quanlidaotao`.`subjectclass` (`subject_id`, `semester_id`, `class_index`, `room`, `start_time`, `end_time`, `week_day`) VALUES ('1', '2', '21', '107-G2', '9:00', '11:00', 'mon');
INSERT INTO `projectdb_quanlidaotao`.`subjectclass` (`subject_id`, `semester_id`, `class_index`, `room`, `start_time`, `end_time`, `week_day`) VALUES ('2', '2', '40', '106-G2', '7:00', '10:00', 'tue');


INSERT INTO `projectdb_quanlidaotao`.`takeclass` (`student_id`, `subject_class_id`) VALUES ('1234', '1');
INSERT INTO `projectdb_quanlidaotao`.`takeclass` (`student_id`, `subject_class_id`) VALUES ('1234', '2');
INSERT INTO `projectdb_quanlidaotao`.`takeclass` (`student_id`, `subject_class_id`) VALUES ('23', '3');
INSERT INTO `projectdb_quanlidaotao`.`takeclass` (`student_id`, `subject_class_id`) VALUES ('23', '2');
