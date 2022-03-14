const fs = require("fs/promises");

/* function readFile() {
  // // read file in the callback
  // fs.readFile("data.txt", function callback(err, data) {
  //   if (err) throw err;
  //   console.log(data.toString());
  //   console.log("File parsing DONE");
  //   // start another async task
  // });

  // promises
  fs.readFile("data.txt")
    .then(function (fileData) {
      console.log(fileData.toString());
      console.log("File parsing DONE");
    })
    .then(function () {})
    // catching errors
    .catch(function (error) {
      console.log(error);
    });
  console.log("DONE");
} */

// async/await
async function readFile() {
  let fileData;
  try {
    fileData = await fs.readFile("data.txt");
  } catch (error) {
    console.log(error);
  }
  console.log("READING");
  console.log(fileData.toString());
  console.log("DONE");
}

readFile();
