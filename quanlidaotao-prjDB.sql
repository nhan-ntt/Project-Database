drop database if exists projectdb_quanlidaotao;
create database projectdb_quanlidaotao;
use projectdb_quanlidaotao;

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

