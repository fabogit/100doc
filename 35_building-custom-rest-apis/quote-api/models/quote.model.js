const db = require('../data/database');

class Quote {
	static async getRandomQuote(){
		const quotes = await db.getDb().collection('quotes').find().toArray();
		const randomIndex = Math.floor(Math.random() * quotes.length);
		// [1, 2, 3] => length: 3 => 0.1 * 3 => 0.3 => Math.floor(0.3) => 0
		const randomQuote = quotes[randomIndex].text;
		console.log(randomQuote);
		return randomQuote;
	}
}

module.exports = Quote;