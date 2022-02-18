console.dir(document);

// DOM drill
// document.body.children[1].children[0].href = "https://google.com";

// #text
console.dir(document.body.firstChild);
// #text and html elements
console.dir(document.body.childNodes);
// html element
console.dir(document.body.firstElementChild);
// html element
console.dir(document.body.children);

// DOM query
let anchorElement = document.getElementById("external-link");
anchorElement.href = "https://google.com";

// query by css selector style / html element type, 1st element
anchorElement = document.querySelector("#external-link");
anchorElement = document.querySelector("p a");
anchorElement.href = "https://academind.com";

//  ADD AN ELEMENT
// 1 create new element

let newAnchorElement = document.createElement("a");
newAnchorElement.href = "https://google.com";
newAnchorElement.textContent = "This leads to Google!";

// 2 access parent element that should hold the new elem

let firstParagraph = document.querySelector("p");

// 3 Insert element into the parent

firstParagraph.append(newAnchorElement);
