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

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `date_graduated` varchar(255) NOT NULL,
  `program` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`email`,`password`,`firstname`,`lastname`,`phone`,`date_graduated`,`program`,`role`,`image`,`createdAt`,`updatedAt`) values 
(1,'admin@gmail.com','$2b$10$T8f6LK2H2zHOD/bNcydXgeL9aNlp4jvSKSuDuae4mI8YkmXLjlH3e','admin','admin','+639123123129','2023-05-30','0','1','admin@gmail.com_341944235_557914406243255_145298723706861646_n.png','2023-05-30 02:31:53','2023-05-30 02:31:53'),
(2,'d@d','$2b$10$9XsY2e02VGU4wu33pzV6HOjVWcj9gINWdSjSkYkVAupiPFcwwng9.','d','d','+639123123121','2023-05-30','18','2','d@d_346012329_1259503841626952_502466902732242847_n.png','2023-05-30 02:38:13','2023-06-01 02:53:06'),
(3,'a@a','$2b$10$HNGHeXMtcXeEebcnG/i.Ue2zi0IASpMGdOhEHd/3SVUPiJziNIgBe','a','a','+639123123129','2023-05-30','20','2','a@a_341944235_557914406243255_145298723706861646_n.png','2023-05-31 06:56:58','2023-05-31 06:56:58'),
(4,'z@z','$2b$10$84/iIKQy2bM8djfSJ4uTmuo9iah5oJSM6p6UgyE/xlUssFaJbkYRe','z','z','+639123123129','2023-06-01','21','2','z@z_346012329_1259503841626952_502466902732242847_n.png','2023-06-01 03:49:35','2023-06-01 03:49:35');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
