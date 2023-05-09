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
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`email`,`password`,`firstname`,`lastname`,`phone`,`position`,`date_graduated`,`program`,`role`,`createdAt`,`updatedAt`) values 
(1,'r@e','$2b$10$PcfpGJ6CUuQin7ugWcH0SOOWXIhGJgfKUG2GaP9ME.8FJXPL64m7G','ew','ew','ew','ew','2023-05-25','ew','2','2023-05-09 07:38:41','2023-05-09 07:38:41'),
(2,'ray@gmail.com','$2b$10$JuHuPQGduQM7CLVF7.5rT.kk3STzBQGtnRZXmI/ADnfhAj7LYCdXy','ray','mark','ew','ew','2023-05-11','ew','2','2023-05-09 07:39:02','2023-05-09 07:39:02'),
(3,'r@r','$2b$10$40UsuK9SjjI.E8eGbmPwWebD.3UPBwUbinR/ZYcKLsUwXgL7ipmbW','r','r','r','r','2023-05-17','r','2','2023-05-09 07:40:30','2023-05-09 08:23:39'),
(4,'admin@gmail.com','$2b$10$yjqHJWjcs9y2m8YZU18/v.QCpzWMQ22XINstI408dG9JRJoreH94a','admin','admin','admin','admin','2023-05-10','admin','1','2023-05-09 08:25:16','2023-05-09 08:25:16'),
(5,'raymark@gmail.com','$2b$10$/.nzV6cv3ySzWwJOIzINmeYEeKkhbGG/mqYVzACoUqvgUpE39dGu6','raymark','raymark','raymark','raymark','2023-05-17','raymark','2','2023-05-09 08:51:29','2023-05-09 08:51:29');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
