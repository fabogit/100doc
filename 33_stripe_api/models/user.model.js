const bcrypt = require('bcryptjs');
const mongodb = require('mongodb');

const db = require('../data/database');
const { mongo } = require('../config/config');

class User {
	constructor(email, password, fullname, street, postal, city) {
		this.email = email;
		this.password = password;
		this.name = fullname;
		this.address = {
			street: street,
			postalCode: postal,
			city: city
		};
	}
	// insert new user into db
	async signup() {
		const hashedPassword = await bcrypt.hash(this.password, 12);

		await db.getDb()
			.collection(mongo.collectionUsers)
			.insertOne({
				email: this.email,
				password: hashedPassword, // this.password,
				address: this.address
			});
	}

	// get user w/out password
	static findById(userId) {
		const mongoUId = new mongodb.ObjectId(userId);
		// return findOne promise, no need to async/await
		return db.getDb()
			.collection(mongo.collectionUsers)
			.findOne(
				{_id: mongoUId},
				// dont retrive password
				{ projection: {password: 0} }
			);
	}

	// get user of entered email
	getUserWithSameMail() {
		// return findOne promise, no need to async/await
		return db.getDb()
			.collection(mongo.collectionUsers)
			.findOne({
				email: this.email
			});
	}

	// check if email is stored, user already created
	async existsAlready() {
		const existingUser = await this.getUserWithSameMail();
		if (existingUser) {
			return true;
		}
		return false;
	}

	// check if entered password is valid
	hasMatchingPassword(hashedPassword) {
		return bcrypt.compare(this.password, hashedPassword);
	}

}

module.exports = User;