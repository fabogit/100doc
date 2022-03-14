const hobbies = ['Sports', 'Cooking']; // a pointer to the array is stored
const age = 99; // the value itself is stored

hobbies.push('Reading'); // the address of the array doesn't change

// hobbies = ['Coding', 'Sleeping']; // not allowed! new address is stored

console.log(hobbies);

// Primitive values: numbers, strings, booleans & more (undefined)
// Reference values: Objects

const person = { age: 32 };

function getAdultYears(perObj) {
  // override obj value
  perObj.age -= 18;
  return perObj.age;
  // derive the value
  // return p.age - 18;
}

// spread operator to create new obj from original obj
console.log(getAdultYears({ ...person }));
console.log(person);