const Product = require('./product.model');

class Cart {
	constructor(items = [], totalQuantity = 0, totalPrice = 0) {
		this.items = items;
		this.totalQuantity = totalQuantity;
		this.totalPrice = totalPrice;
	}
	// store cart items to session
	addItem(product) {
		const cartItem = {
			product: product,
			quantity: 1,
			totalPrice: product.price,
		};

		// add item to cart, if already in cart update quantity and price
		for (let i = 0; i < this.items.length; i++) {
			const item = this.items[i];
			if (item.product.id === product.id) {
				cartItem.quantity = parseInt(item.quantity) + 1;
				cartItem.totalPrice = parseFloat(item.totalPrice) + parseFloat(product.price);
				this.items[i] = cartItem;

				this.totalQuantity++;
				this.totalPrice += parseFloat(product.price);
				return;
			}
		}

		this.items.push(cartItem);
		this.totalQuantity++;
		this.totalPrice += parseFloat(product.price);
	}

	updateItem(productId, newQuantity){
		// update quantity and price
		for (let i = 0; i < this.items.length; i++) {
			const item = this.items[i];
			if (item.product.id === productId && newQuantity > 0) {
				// increase price & quantity
				const cartItem = {...item};
				const quantityChange = parseInt(newQuantity) - parseInt(item.quantity);
				cartItem.quantity = parseInt(newQuantity);
				cartItem.totalPrice = parseInt(newQuantity) * parseFloat(item.product.price);
				// update item
				this.items[i] = cartItem;

				this.totalQuantity = parseInt(this.totalQuantity) + parseInt(quantityChange);
				this.totalPrice += parseInt(quantityChange) * parseFloat(item.product.price);
				return { updatedItemPrice: cartItem.totalPrice };
			} else if(item.product.id === productId && newQuantity <= 0) {
				// remove item from items & update
				this.items.splice(i, 1);
				this.totalQuantity = parseInt(this.totalQuantity) - parseInt(item.quantity);
				this.totalPrice -= parseFloat(item.totalPrice);
				return { updatedItemPrice: 0 };
			}
		}
	}

	async updatePrices() {
		const productIds = this.items.map((item) => item.product.id);
		const products = await Product.findMultiple(productIds);

		// check if cart items are still available in the db, remove if not
		const deletableCartItemProductIds = [];
		for (const cartItem of this.items) {
			// get up to date data of cart items
			const product = products.find((prod) => prod.id === cartItem.product.id);

			if (!product) {
				// product was deleted!
				// "schedule" for removal from cart and skip remaing loop code
				deletableCartItemProductIds.push(cartItem.product.id);
				continue;
			}

			// product was not deleted
			// set product data and total price to latest price from database
			cartItem.product = product;
			cartItem.totalPrice = parseInt(cartItem.quantity) * parseFloat(cartItem.product.price);
		}

		if (deletableCartItemProductIds.length > 0) {
			this.items = this.items.filter(function (item) {
				// if index value exist in deletable array drop element[index]
				return deletableCartItemProductIds.indexOf(item.product.id) < 0;
			});
		}

		// reset and calculate cart totals
		this.totalQuantity = 0;
		this.totalPrice = 0;

		for (const item of this.items) {
			this.totalQuantity = parseInt(this.totalQuantity) + parseInt(item.quantity);
			this.totalPrice = parseFloat(this.totalPrice) + parseFloat(item.totalPrice);
		}
	}
}

module.exports = Cart;