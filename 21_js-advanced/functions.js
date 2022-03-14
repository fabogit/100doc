function greetUser(firstString, secondString = "defaultString") {
  console.log(`${firstString} ${secondString}`);
}

greetUser();
greetUser("Hello", "World!");
