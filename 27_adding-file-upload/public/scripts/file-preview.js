const filePickerElement = document.getElementById("image");
const imagePreviewElement = document.getElementById("image-preview");

function showPreview() {
  const files = filePickerElement.files;
  if (!files || files.length === 0) {
    // hide preview element if there is no file
    imagePreviewElement.style.display = "none";
    return;
  }
  const selectedFile = files[0];
  // generate local url to the user system selected file
  //  and set is as source for preview
  imagePreviewElement.src = URL.createObjectURL(selectedFile);

  // show preview element when awailable
  imagePreviewElement.style.display = "block";
}

filePickerElement.addEventListener("change", showPreview);
