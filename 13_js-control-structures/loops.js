// for loop
for (let i = 0; i < 10; i++) {
  console.log(i);
}

/* 
also works ->
for (let i = 0; i < someArray.length; i++) {
  console.log(someArray[i]);
}
*/

// 'for of' loop
const myArray = ["max", "anna", " joel"];

for (const element of myArray) {
  console.log(element);
}

// 'for in' loop
const myObject = {
  name: "max",
  age: 32,
  isAdmin: true,
};

for (const key in myObject) {
  // property name
  console.log(key)
  // property value
  console.log(myObject[key])
}