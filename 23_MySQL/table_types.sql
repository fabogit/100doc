-- restaurant type table
CREATE TABLE if not exists `restaurant_finder`.`types` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(100) NOT NULL,
	PRIMARY KEY(`id`))
ENGINE = InnoDB;

-- DROP TABLE restaurant_finder.types;