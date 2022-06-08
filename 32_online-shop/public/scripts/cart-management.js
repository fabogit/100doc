const addToCartButtonElement = document.querySelector('#product-details button');
const cartBadgeElements = document.querySelectorAll('.nav-items .badge');

async function addToCart() {
	// button element data- attribute contains the product.id passed by ejs
	const dataProductId = addToCartButtonElement.dataset.productid;
	const dataCsrfToken = addToCartButtonElement.dataset.csrf;
	let response;
	try {
		response = await fetch('/cart/items', {
			method: 'POST',
			// encode data to json
			body: JSON.stringify({
				productId: dataProductId,
				_csrf: dataCsrfToken
			}),
			// set headers to use the correct parsing on the request data
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

	// decode response data from json
	const responseData = await response.json();
	const newTotalQuantity = responseData.newTotalItems;
	// select badge item and update cart number
	for (const cartBadge of cartBadgeElements) {
		cartBadge.textContent = newTotalQuantity;
	}
}

addToCartButtonElement.addEventListener('click', addToCart);