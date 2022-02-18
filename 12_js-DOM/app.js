// listening to click
let paragraphElement = document.querySelector("p");

function changeParagraphText() {
  paragraphElement.textContent = "Clicked!";
  console.log("Paragraph clicked!");
}

paragraphElement.addEventListener("click", changeParagraphText);

// listening to input
function retriveUserInput() {
  let enteredText = inputElement.value;
  console.log(enteredText);
}

let inputElement = document.querySelector("input");
inputElement.addEventListener("input", retriveUserInput);
