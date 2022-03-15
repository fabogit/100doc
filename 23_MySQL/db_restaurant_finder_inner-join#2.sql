SELECT
	reviews.*,
	restaurants.name AS restaurant_name,
	addresses.*,
	types.name AS restaurant_type
FROM
	restaurant_finder.reviews
INNER JOIN restaurants ON
	reviews.restaurant_id = restaurants.id
INNER JOIN addresses ON
	restaurants.address_id = addresses.id
INNER JOIN types ON
	restaurants.type_id = types.id
WHERE
	rating > 3