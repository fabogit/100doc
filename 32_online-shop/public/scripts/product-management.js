// [] all delete buttons
const deleteProductButtonElements = document.querySelectorAll('.product-item button');

async function deleteProduct(event) {
	//
	const buttonElement = event.target;
	const productId = buttonElement.dataset.productid;
	const csrfToken = buttonElement.dataset.csrf;
	// delete request and csurf token
	// const domain = `${node.host}:${node.port}`;
	const ajaxUrl = `/admin/products/${productId}?_csrf=${csrfToken}`;
	const response = await fetch(ajaxUrl, {method: 'DELETE'});
	console.log(response);
	if (!response.ok) {
		alert('Something went wrong!');
		return;
	}
	// reach the parent product-item to remove div/div/article/li
	buttonElement.parentElement.parentElement.parentElement.parentElement.remove();

}

for (const deleteProductButtonElement of deleteProductButtonElements) {
	deleteProductButtonElement.addEventListener('click', deleteProduct);
}