const Product = require('../models/product.model');

async function getAllProducts(req, res, next){
	try {
		const allProducts = await Product.findAll();
		res.render('customer/products/all-products', { products: allProducts});
	} catch (error) {
		next(error);
	}
}

module.exports = {
	getAllProducts: getAllProducts
};