const Product = require('../models/product.model');

async function getProducts(req, res, next) {
  try {
    const productsArray = await Product.findAll();
    res.render('admin/products/all-products', { products: productsArray});
  } catch (error) {
    next(error);
    return;
  }
}

function getNewProduct(req, res) {
  res.render('admin/products/new-product');
}

async function createNewProduct(req, res, next) {
  // console.log(req.body);
  // console.log(req.file);
  const product = new Product({
    ...req.body,
    image: req.file.filename
  });
  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect('/admin/products');
}

module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  createNewProduct: createNewProduct
};