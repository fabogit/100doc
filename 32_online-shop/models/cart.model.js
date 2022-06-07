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
				cartItem.totalPrice = parseInt(newQuantity) * parseFloat(product.price);
				// update item
				this.items[i] = cartItem;

				this.totalQuantity = parseInt(this.totalQuantity) + parseInt(quantityChange);
				this.totalPrice += parseInt(quantityChange) * parseFloat(product.price);
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
}

module.exports = Cart;