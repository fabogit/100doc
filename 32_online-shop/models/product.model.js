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