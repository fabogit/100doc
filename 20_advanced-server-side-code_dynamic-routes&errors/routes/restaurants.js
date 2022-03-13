const express = require("express");
const uuid = require("uuid");

const resData = require("../util/restaurant-data");

const router = express.Router();

router.get("/restaurants", function (req, res) {
  const restaurantsJson = resData.getStoredRestaurants();

  res.render("restaurants", {
    numberOfRestaurants: restaurantsJson.length,
    restaurants: restaurantsJson,
  });
});

router.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id;
  const restaurantsJson = resData.getStoredRestaurants();

  for (const storedRestaurant of restaurantsJson) {
    if (storedRestaurant.id === restaurantId) {
      return res.render("restaurants-detail", { restaurant: storedRestaurant });
    }
  }

  res.status(404).render("404");
});

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const restaurantsJson = resData.getStoredRestaurants();

  restaurantsJson.push(restaurant);
  resData.storeRestaurants(restaurantsJson);

  res.redirect("/confirm");
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;
