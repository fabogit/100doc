// assign default value to param
function greetUser(firstString, secondString = "defaultString") {
  console.log(`${firstString} ${secondString}`);
}

greetUser();
greetUser("Hello", "World!");

/* simple loop using array parameter
function sumUp(numbers) {
  let sum;

  for (const number of numbers) {
    sum += number;
  }
  return sum;
}

console.log(sumUp( [1, 5, 10, 11, 20] ));

*/
// alternative using rest parameters, will work for 1 to n params
function sumUp(...numbers) {
  let sum = 0;

  for (const number of numbers) {
    sum += number;
  }
  return sum;
}

// simple array
console.log(sumUp([1, 5, 10, 11, 20]));

// rest parameters (merge params list into array)
console.log(sumUp(1, 5, 10, 11, 20));

// spread operator (spread array into single params)
const inputNumbers = [1, 5, 10, 11, 20];
console.log(sumUp(...inputNumbers));

// spread
const values = [-5, 3, 10];
console.log(Math.max(...values));

// functions posses inferred propierties, try console.dir(funName) in browser
console.log(sumUp.name, sumUp.arguments, sumUp.caller, sumUp.prototype)
