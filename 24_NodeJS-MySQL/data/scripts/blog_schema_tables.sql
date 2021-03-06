DROP SCHEMA IF EXISTS `blog`;

DROP TABLE IF EXISTS blog.authors, blog.posts;

CREATE SCHEMA `blog`;

CREATE TABLE `blog`.`authors` (
`id` INT NOT NULL AUTO_INCREMENT,
`name` VARCHAR(255) NOT NULL,
`email` VARCHAR(255) NOT NULL,
PRIMARY KEY (`id`));

CREATE TABLE `blog`.`posts` (
`id` INT NOT NULL AUTO_INCREMENT,
`title` VARCHAR(255) NOT NULL,
`summary` VARCHAR(255) NOT NULL,
`body` TEXT NOT NULL,
`date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
`author_id` INT NOT NULL,
PRIMARY KEY (`id`));