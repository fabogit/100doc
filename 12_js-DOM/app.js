console.dir(document);

document.body.children[1].children[0].href = "https://google.com";

// #text
console.dir(document.body.firstChild)
// #text and html elements
console.dir(document.body.childNodes)
// html element
console.dir(document.body.firstElementChild)
// html element
console.dir(document.body.children)