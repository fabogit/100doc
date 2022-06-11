const imageBrowseElement = document.querySelector('#image-upload-control input');
const imagePreviewElement = document.querySelector('#image-upload-control img');

// change display on #image-upload-control img
function updateImagePreview() {
	const files = imageBrowseElement.files;

	if (!files || files.length === 0) {
		// hide if no image or was selected and deselected
		imagePreviewElement.style.display = 'none';
		return;
	}
	const pickedFile = files[0];
	// create image url to local file on client side and set it as img source
	imagePreviewElement.src = URL.createObjectURL(pickedFile);
	imagePreviewElement.style.display = 'block';
}

// event listener, when image isselected it toggle the preview menu to show/hide,
imageBrowseElement.addEventListener('change', updateImagePreview);