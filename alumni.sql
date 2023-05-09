/*
SQLyog Community v13.2.0 (64 bit)
MySQL - 10.4.27-MariaDB : Database - alumni_db
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

/*Table structure for table `userdata` */

DROP TABLE IF EXISTS `userdata`;

CREATE TABLE `userdata` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `date_graduated` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `userdata` */

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`username`,`email`,`password`,`role`,`createdAt`,`updatedAt`) values 
(1,'raymark','raymark@gmail.com','$2b$10$wrxlNZm/8xEWGaV/4yEkAugFolRUqbw2y28AiPQPAS0wOIDoUFD1m','2','2023-05-08 06:44:11','2023-05-08 06:44:11'),
(2,'ra','wew@gmail.com','$2b$10$6s8DFMGj71KJDeCmWCxz/OHulkW/OcTQ7zNiSyxpO.XB3t0Xb9tfu','2','2023-05-08 06:46:59','2023-05-08 06:46:59'),
(3,'rq','ewq@gmail.com','$2b$10$c0PtY1KUGsl.fPm4OjTAVuUmW5msszdsW5qGALuzspLGPMuTL7Cx.','2','2023-05-08 06:48:09','2023-05-08 06:48:09'),
(4,'ray','ray@gmail.com','$2b$10$hv/fPKo7H6zWniV90GeRDONCx21mcV2HauTll.8ckwdyZEQH16FWi','2','2023-05-08 07:14:26','2023-05-08 07:14:26'),
(5,'raymarkcruz','raymarkcruz@gmail.com','$2b$10$Fg36fLZyuv3SzTKUWbKK1OiA1GseaE6NHKCagEX7h3eSm91k73Hjq','2','2023-05-08 08:39:27','2023-05-08 08:39:27');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
