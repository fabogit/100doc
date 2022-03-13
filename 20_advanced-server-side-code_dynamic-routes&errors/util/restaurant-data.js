const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "data", "restaurants.json");

function getStoredRestaurantsUtil() {
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);
  return storedRestaurants;
}

function storeRestaurantsUtil(storableRestaurants) {
  fs.writeFileSync(filePath, JSON.stringify(storableRestaurants));
}

module.exports = {
  getStoredRestaurants: getStoredRestaurantsUtil,
  storeRestaurants: storeRestaurantsUtil,
};
