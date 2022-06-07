const cartItemUpdateFormElements = document.querySelectorAll('.cart-item-management');

async function updateCartItem(event) {
	// avoid browser automatic behaviour on form submit
	event.preventDefault();

	const form = event.target;
	const dataProductId = form.dataset.productid;
	const dataCsrfToken = form.dataset.csrf;
	const dataQuantity = form.firstElementChild.value;

	let response;
	try {
		response = await fetch('/cart/items', {
			method: 'PATCH',
			body: JSON.stringify({
				productId: dataProductId,
				quantity: dataQuantity,
				_csrf: dataCsrfToken
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		alert('Something went wrong!');
		return;
	}
	if (!response.ok) {
		alert('Something went wrong!');
		return;
	}

	const responseData = await response.json();
}

for (const formElement of cartItemUpdateFormElements) {
	formElement.addEventListener('submit', updateCartItem);
}