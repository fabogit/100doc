const updateOrderFormElements = document.querySelectorAll('.order-actions form');

async function updateOrder(event) {
	//  prevent default browser http request on form submit
	event.preventDefault();
	const form = event.target;

	// build FormData class to use get method on form values
	const formData = new FormData(form);
	const newStatus = formData.get('status');
	const orderId = formData.get('orderid');
	const csrfToken = formData.get('_csrf');

	let response;
	// ajax request to update order
	try {
		response = await fetch(`/admin/orders/${orderId}`, {
			method: 'PATCH',
			body: JSON.stringify({
				newStatus: newStatus,
				_csrf: csrfToken,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		alert('Something went wrong - could not update order status.');
		return;
	}

	if (!response.ok) {
		alert('Something went wrong - could not update order status.');
		return;
	}

	const responseData = await response.json();
	const responseNewStatus = responseData.newStatus.toUpperCase();
	// update badge status value
	form.parentElement.parentElement.querySelector('.badge').textContent = responseNewStatus;
}

// update order when dropdown menu is changed
for (const updateOrderFormElement of updateOrderFormElements) {
	updateOrderFormElement.addEventListener('submit', updateOrder);
}