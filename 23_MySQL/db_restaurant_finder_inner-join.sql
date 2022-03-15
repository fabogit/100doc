SELECT
	restaurants.id ,
	restaurants.name,
	addresses.*,
	types.name AS type_name
FROM
	restaurant_finder.restaurants
INNER JOIN restaurant_finder.addresses ON
	(restaurants.address_id = addresses.id)
INNER JOIN restaurant_finder.types ON
	(restaurants.type_id = types.id)
WHERE addresses.city = 'Munich'