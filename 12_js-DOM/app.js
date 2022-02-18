// listening to click
let paragraphElement = document.querySelector("p");

function changeParagraphText(event) {
  paragraphElement.textContent = "Clicked!";
  console.log("Paragraph clicked!");
  console.log(event);
}

paragraphElement.addEventListener("click", changeParagraphText);

// listening to input
function retriveUserInput(event) {
  // let enteredText = inputElement.value;
  // let enteredText = event.data; => single value enetered
  let enteredText = event.target.value;
  console.log(enteredText);
  console.log(event);
}

let inputElement = document.querySelector("input");
inputElement.addEventListener("input", retriveUserInput);
