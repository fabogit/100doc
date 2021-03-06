// object litteral notation
/* 
const job = {
  title: "Developer",
  location: "New York",
  salary: 50000,
};
*/

console.log(new Date().toISOString());

// class notation
class Job {
  constructor(jobTitle, place, salary) {
    this.title = jobTitle;
    this.location = place;
    this.salary = salary;
  }
  // class methods
  describe() {
    console.log(
      `I'm a ${this.title}, i work in ${this.location} and i earn ${this.salary}$.`
    );
  }
}

const developer = new Job("Developer", "New York", 50000);
const cook = new Job("Cook", "Munich", 30000);

console.log(developer);
console.log(cook.title, cook.salary);

developer.describe();

// array destructoring
const values = ["one", "two"];

const [first, last] = values;
console.log(first, last);

// object destructoring
const job = { title: "Developer", location: "New York" };

const { title: jTitle } = job;
const { location } = job;
console.log(jTitle, location);
