-- query all
SELECT * FROM  restaurant_finder.restaurants r;
-- query table
SELECT * FROM  restaurant_finder.restaurants r  WHERE  `type` = 'German';
-- aggregate
SELECT COUNT(*)  FROM  restaurant_finder.restaurants r  WHERE  `type` = 'German';