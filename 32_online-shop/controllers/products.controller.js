const Product = require('../models/product.model');

async function getAllProducts(req, res, next){
	try {
		const allProducts = await Product.findAll();
		res.render('customer/products/all-products', { products: allProducts});
	} catch (error) {
		next(error);
	}
}

async function getProductDetails(req, res, next) {
	try {
		const productItem = await Product.findById(req.params.id);
		res.render('customer/products/product-details', { product: productItem });
	} catch (error) {
		next(error);
	}
}

module.exports = {
	getAllProducts: getAllProducts,
	getProductDetails: getProductDetails
};