-- restaurants addresses table
CREATE TABLE if not exists `restaurant_finder`.`addresses` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`street` VARCHAR(255) NOT NULL,
	`street_number` VARCHAR (45) NOT NULL,
	`city` VARCHAR (255) NOT NULL,
	`postal_code` INT NOT NULL,
	`country` VARCHAR(255) NOT NULL,
	PRIMARY KEY(`id`))
ENGINE = InnoDB;

-- DROP TABLE restaurant_finder.addresses;