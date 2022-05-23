const mongodb = require('mongodb');

const db = require('../data/database');
const { mongo } = require('../config/config');

class Product {
	constructor(productData) {
		this.title = productData.title;
		this.summary = productData.summary;
		this.price = +productData.price; //force number
		this.description = productData.description;
		this.image = productData.image; // name of image file
		this.imagePath = `product-data/images/${productData.image}`;
		this.imageUrl = `/products/assets/images/${productData.image}`;
		if (productData._id) {
			this.id = productData._id.toString();
		}
	}

	static async findById(productIdParam) {
		// scoping var for the try/catch
		let productId;
		try {
			productId = new mongodb.ObjectId(productIdParam);
		} catch (error) {
			error.code = 404;
			throw error;
		}
		const product = await db.getDb()
			.collection(mongo.collectionProducts)
			.findOne({ _id: productId });
		if (!product) {
			const error = new Error('Could not find product with the provided id');
			error.code = 404;
			throw error;
		}
		return product;
	}

	static async findAll() {
		const products = await db.getDb()
			.collection(mongo.collectionProducts)
			.find()
			.toArray();

		return products.map((productDocument) => {
			return new Product(productDocument);
		});
	}

	async save() {
		const productData = {
			title: this.title,
			summary: this.summary,
			price: this.price,
			description: this.description,
			image: this.image
		};

		await db.getDb()
			.collection(mongo.collectionProducts)
			.insertOne(productData);
	}
}

module.exports = Product;