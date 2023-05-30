/*
SQLyog Community v13.2.0 (64 bit)
MySQL - 10.4.28-MariaDB : Database - alumni_db
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`alumni_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `alumni_db`;

/*Table structure for table `jobs` */

DROP TABLE IF EXISTS `jobs`;

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `job_position` varchar(255) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `company_type` varchar(255) NOT NULL,
  `time_period` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `jobs` */

/*Table structure for table `programs` */

DROP TABLE IF EXISTS `programs`;

CREATE TABLE `programs` (
  `program` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`program`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `programs` */

insert  into `programs`(`program`,`name`) values 
('0','BACHELOR OF ARTS IN COMMUNICATION'),
('1','BACHELOR OF ARTS IN POLITICAL SCIENCE'),
('10','BACHELOR OF SCIENCE IN COMPUTER ENGINEERING'),
('11','BACHELOR OF SCIENCE IN CRIMINOLOGY'),
('12','BACHELOR OF SECONDARY EDUCATION (ENGLISH)'),
('13','BACHELOR OF SCIENCE IN HOSPITALITY MANAGEMENT'),
('14','BACHELOR OF SCIENCE IN HOTEL AND RESTAURANT MANAGEMENT'),
('15','BACHELOR OF SCIENCE IN INTERNAL AUDITING'),
('16','BACHELOR OF SCIENCE IN INDUSTRIAL ENGINEERING'),
('17','BACHELOR OF SCIENCE IN INFORMATION SYSTEM'),
('18','BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY'),
('19','BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY - CYBER SECURITY'),
('2','BACHELOR OF ARTS IN PSYCHOLOGY'),
('20','BACHELOR OF SCIENCE IN MIDWIFERY'),
('21','BACHELOR OF SCIENCE IN MANAGEMENT ACCOUNTING'),
('22','BACHELOR OF SCIENCE IN NURSING'),
('23','BACHELOR OF SCIENCE IN OFFICE MANAGEMENT'),
('24','BACHELOR OF SCIENCE IN PSYCHOLOGY'),
('25','BACHELOR OF SCIENCE IN TOURISM MANAGEMENT'),
('26','BACHELOR OF TECHNOLOGY AND LIVELIHOOD EDUCATION (HOME ECONOMICS)'),
('27','CERTIFICATE OF TEACHING EDUCATION'),
('28','DIPLOMA IN MIDWIFERY'),
('29','MEDICAL STUDENT BRIDGING PROGRAM'),
('3','BACHELOR OF ELEMENTARY EDUCATION'),
('30','TESDA: CUSTOMER SERVICE NCII'),
('31','TESDA: MICROFINANCE TECHNOLOGY NC II'),
('32','BACHELOR OF SECONDARY EDUCATION (FILIPINO)'),
('33','BACHELOR OF SECONDARY EDUCATION (SOCIAL STUDIES)'),
('34','BACHELOR OF SECONDARY EDUCATION (VALUES EDUCATION)'),
('35','BACHELOR OF SECONDARY EDUCATION (MATHEMATICS)'),
('36','BACHELOR OF SECONDARY EDUCATION (PHYSICAL SCIENCE)'),
('37','BACHELOR OF TECHNOLOGY AND LIVELIHOOD EDUCATION (INFORMATION AND COMMUNICATION TECHNOLOGY)'),
('38','BACHELOR OF SCIENCE IN BUSINESS MANAGEMENT MAJOR IN HUMAN RESOURCES MANAGEMENT'),
('39','BACHELOR OF SCIENCE IN BUSINESS MANAGEMENT MAJOR IN FINANCIAL MANAGEMENT'),
('4','BACHELOR OF PHYSICAL EDUCATION'),
('40','BACHELOR OF SCIENCE IN BUSINESS MANAGEMENT MAJOR IN MARKETING MANAGEMENT'),
('41','BACHELOR OF SECONDARY EDUCATION (SCIENCE)'),
('42','BACHELOR OF SCIENCE IN BUSINESS MANAGEMENT MAJOR IN OPERATION MANAGEMENT'),
('5','BACHELOR OF SCIENCE IN BIOLOGY'),
('6','BACHELOR OF SCIENCE IN ACCOUNTANCY'),
('7','BACHELOR OF SCIENCE IN ACCOUNTANCY INFORMATION SYSTEM'),
('8','BACHELOR OF SCIENCE IN CIVIL ENGINEERING'),
('9','BACHELOR OF SCIENCE IN COMPUTER SCIENCE');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `date_graduated` varchar(255) NOT NULL,
  `program` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`email`,`password`,`firstname`,`lastname`,`phone`,`position`,`date_graduated`,`program`,`role`,`image`,`createdAt`,`updatedAt`) values 
(1,'admin@gmail.com','$2b$10$T8f6LK2H2zHOD/bNcydXgeL9aNlp4jvSKSuDuae4mI8YkmXLjlH3e','admin','admin','+639123123129','admin','2023-05-30','0','1','admin@gmail.com_341944235_557914406243255_145298723706861646_n.png','2023-05-30 02:31:53','2023-05-30 02:31:53'),
(2,'d@d','$2b$10$9XsY2e02VGU4wu33pzV6HOjVWcj9gINWdSjSkYkVAupiPFcwwng9.','d','d','+639123123121','IT','2023-05-30','18','2','d@d_341944235_557914406243255_145298723706861646_n.png','2023-05-30 02:38:13','2023-05-30 02:38:13');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
