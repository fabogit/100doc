const fs = require("fs");

function readFile() {
  // read file in the callback
  fs.readFile("data.txt", function callback(err, data) {
    if (err) throw err;
    console.log(data.toString());
    console.log("File parsing DONE");
  });

  console.log("DONE");
}

readFile();
