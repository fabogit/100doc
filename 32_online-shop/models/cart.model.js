class Cart{
	constructor(items = []){
		this.items = items;
	}

	// store cart items to session
	addItem(product){
		const cartItem = {
			product: product,
			quantity: 1,
			totalPrice: product.price
		};

		// add item to cart or if already in cart update quantity
		for (let index = 0; index < this.items.length; index++) {
			const item = this.items[index];
			if (item.product.id === product.id) {
				cartItem.quantity = item.quantity + 1;
				cartItem.totalPrice = item.totalPrice + product.price;
				this.items[index] = cartItem;
				return;
			}
		}
		this.items.push(product);
	}
}

module.exports = Cart;