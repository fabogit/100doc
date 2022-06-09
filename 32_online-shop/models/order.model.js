const db = require('../data/database');
const { mongo } = require('../config/config');

class Order{
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

	save(){

		if (this.id) {
			// update order
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