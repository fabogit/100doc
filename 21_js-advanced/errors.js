const fs = require("fs");

function readFile() {
  let fileData = "outer scope";
  try {
    // inner scope declaring, shadow the outer scope
    const fileData = fs.readFileSync("data.json");
  } catch {
    // inner scope declaring, shadow the outer scope
    const fileData = "inner scope";
    console.log("An error occurred!");
    console.log(fileData);
  }
  // outer scope, initial var value
  console.log(fileData);
  console.log("still inside the function");
}

readFile();
