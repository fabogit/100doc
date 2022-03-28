-- DROP SCHEMA IF EXISTS `security`;

-- DROP TABLE IF EXISTS security.comments;

CREATE SCHEMA `security`;

CREATE TABLE `security`.`comments` (
`id` INT NOT NULL AUTO_INCREMENT,
`author` VARCHAR(255) NOT NULL,
`text` TEXT NOT NULL,
PRIMARY KEY (`id`));