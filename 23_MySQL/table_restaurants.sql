-- create table
CREATE TABLE `restaurant_finder`.`restaurants` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	`type` VARCHAR (255) NOT NULL,
	PRIMARY KEY(`id`))
ENGINE = InnoDB;