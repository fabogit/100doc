//  1st example: sum mumbers (for loop)

const calculateSumButtonElement = document.querySelector("#calculator button");

function calculateSum(event) {
  const userNumberInputElement = document.getElementById("user-number");
  const enteredNumber = userNumberInputElement.value;

  let sumUpToNumber = 0;
  for (let i = 0; i <= enteredNumber; i++) {
    sumUpToNumber += i;
  }

  const outputResultElement = document.getElementById("calculated-sum");
  outputResultElement.textContent = sumUpToNumber;
  outputResultElement.style.display = "block";
}

calculateSumButtonElement.addEventListener("click", calculateSum);

// 2nd example: highlight links, (for-of loop)

const highlightLinksButtonElement = document.querySelector(
  "#highlight-links button"
);

function highlightLinks() {
  const anchorElements = document.querySelectorAll("#highlight-links a");

  for (const anchorElement of anchorElements) {
    anchorElement.classList.add("highlight");
  }
}

highlightLinksButtonElement.addEventListener("click", highlightLinks);

//  3d example: display user data, (for-in loop)

const dummyUserData = {
  firstName: "fab",
  lastName: "b",
  age: 34,
};

const displayUserDataButtonElement =
  document.querySelector("#user-data button");
function displayUserData() {
  const outputDataElement = document.getElementById("output-user-data");

  outputDataElement.innerHTML = "";

  for (const key in dummyUserData) {
    const newUserDataListElement = document.createElement("li");

    const outputText = key.toUpperCase() + ": " + dummyUserData[key];

    newUserDataListElement.textContent = outputText;
    outputDataElement.append(newUserDataListElement);
  }
}

displayUserDataButtonElement.addEventListener("click", displayUserData);
