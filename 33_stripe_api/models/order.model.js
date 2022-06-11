const mongodb = require('mongodb');

const db = require('../data/database');
const { mongo } = require('../config/config');

class Order{
	// Status => pending, fulfilled, cancelled
	constructor(cart, userData, status = 'pending', date, orderId){
		this.productData = cart;
		this.userData = userData;
		this.status = status;
		// iso string to Date
		this.date = new Date(date);
		if (this.date) {
			this.formattedDate = this.date.toLocaleDateString('en-US', {
				weekday: 'short',
				day: 'numeric',
				month: 'long',
				year: 'numeric'
			});
		}
		this.id = orderId;
	}

	static transformOrderDocument(orderDoc) {
		// transform object into instance of class
		return new Order(
			orderDoc.productData,
			orderDoc.userData,
			orderDoc.status,
			orderDoc.date,
			orderDoc._id
		);
	}

	static transformOrderDocuments(orderDocs) {
		return orderDocs.map(this.transformOrderDocument);
	}

	static async findAll() {
		const orders = await db
			.getDb()
			.collection('orders')
			.find()
			.sort({ _id: -1 })
			.toArray();

		return this.transformOrderDocuments(orders);
	}

	static async findAllForUser(userId) {
		const uid = new mongodb.ObjectId(userId);

		const orders = await db
			.getDb()
			.collection(mongo.collectionOrders)
			.find({ 'userData._id': uid })
			.sort({ _id: -1 })
			.toArray();

		return this.transformOrderDocuments(orders);
	}

	static async findById(orderId) {
		const order = await db
			.getDb()
			.collection(mongo.collectionOrders)
			.findOne({ _id: new mongodb.ObjectId(orderId) });

		return this.transformOrderDocument(order);
	}

	save(){

		if (this.id) {
			// update order status
			const orderId = new mongodb.ObjectId(this.id);
			return db
				.getDb()
				.collection(mongo.collectionOrders)
				.updateOne({ _id: orderId }, { $set: { status: this.status } });
		} else {
			// store new order to db
			const orderDocument ={
				userData: this.userData,
				productData: this.productData,
				date: new Date(),
				status: this.status
			};
			return db.getDb().collection(mongo.collectionOrders).insertOne(orderDocument);

		}
	}
}

module.exports = Order;