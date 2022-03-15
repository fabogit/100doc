-- types
INSERT
	INTO
	restaurant_finder.types (name)
VALUES ('Italian'),('American'),('German'),('French'),('Mexican');

SELECT
	*
FROM
	restaurant_finder.types t;

-- addresses
INSERT
	INTO
	restaurant_finder.addresses (street,
	street_number,
	city,
	postal_code,
	country)
VALUES ('Teststreet', '23a', 'Munich', 81541, 'Germany'),
('Greatstreet', '12', 'Berlin', 618001, 'Germany');

SELECT
	*
FROM
	restaurant_finder.addresses a;

-- restaurants
INSERT
	INTO
	restaurant_finder.restaurants (name,
	address_id,
	type_id	
	)
VALUES ('Schnitzelhaus', 1, 3),('Burger House', 1, 2),('Da Mamma', 2, 1);

SELECT
	*
FROM
	restaurant_finder.restaurants r;

-- reviews
INSERT 
	INTO
	restaurant_finder.reviews (reviewer_name ,
	rating,
	`text`,
	restaurant_id
	)
VALUES ('Mario Rossi', 4, 'Good', 2),('Jules Barns', 4, 'Meh', 3),('Ana Swartz', 5, 'Amazing', 3);

SELECT
	*
FROM
	restaurant_finder.reviews r;