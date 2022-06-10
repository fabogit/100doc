const mongodb = require('mongodb');

const db = require('../data/database');
const { mongo } = require('../config/config');

class Product {
	constructor(productData) {
		this.title = productData.title;
		this.summary = productData.summary;
		// force string to number => parseFloat() || +productData.price
		this.price = parseFloat(productData.price);
		this.description = productData.description;
		this.image = productData.image; // name of image file
		this.updateImageData();
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
		return new Product(product);
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

	static async findMultiple(ids) {
		const productIds = ids.map(function(id) {
			return new mongodb.ObjectId(id);
		});

		const products = await db
			.getDb()
			.collection(mongo.collectionProducts)
			// id in ids[]
			.find({ _id: { $in: productIds } })
			.toArray();

		return products.map(function (productDocument) {
			return new Product(productDocument);
		});
	}

	updateImageData(){
		this.imagePath = `/product-data/images/${this.image}`;
		this.imageUrl = `/products/assets/images/${this.image}`;
	}

	replaceImage(newImage){
		this.image = newImage;
		this.updateImageData();
	}

	async save() {
		const productData = {
			title: this.title,
			summary: this.summary,
			price: this.price,
			description: this.description,
			image: this.image
		};
		// save || update (if id present)
		if (this.id) {
			const productId = new mongodb.ObjectId(this.id);
			if (!this.image) {
				// no new image from user or old present in the db
				// delete to avoid overwrite the value with undefined
				delete productData.image;
			}
			await db.getDb()
				.collection(mongo.collectionProducts)
				.updateOne({_id: productId}, {$set: productData});
		}else{
			await db.getDb()
				.collection(mongo.collectionProducts)
				.insertOne(productData);
		}
	}

	remove(){
		const productId = new mongodb.ObjectId(this.id);
		// return a promise, async/await when invoked
		return db.getDb()
			.collection(mongo.collectionProducts)
			.deleteOne({_id: productId});
	}
}

module.exports = Product;