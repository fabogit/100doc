// run into mongosh

// types collection
db.types.insertMany(
  [
    { name: "French" },
    { name: "Chinese" },
    { name: "Japanese" },
    { name: "Italian" },
    { name: "Greek" },
    { name: "Indian" },
    { name: "Mexican" },
    { name: "American" },
    { name: "German" },
    { name: "Turkish" },
  ],
  {}
);

// restaurants collection
db.restaurants.insertMany(
  [
    {
      name: "ASPIC",
      address: {
        street: "Rue Louise-Émilie de la Tour d'Auvergne",
        street_number: "24",
        postalCode: 75009,
        city: "Paris",
        country: "France",
      },
      type: { typeId: ObjectId("62324c2aa3ad5feadd302f69"), name: "French" },
    },
    {
      name: "Shang Palace",
      address: {
        street: "Av. d'Iéna",
        street_number: "10",
        postalCode: 75116,
        city: "Paris",
        country: "France",
      },
      type: { typeId: ObjectId("62324c2aa3ad5feadd302f6a"), name: "Chinese" },
    },
    {
      name: "Mosuke",
      address: {
        street: "Rue Raymond Losserand",
        street_number: "11",
        postalCode: 75014,
        city: "Paris",
        country: "France",
      },
      type: { typeId: ObjectId("62324c2aa3ad5feadd302f6b"), name: "Japanese" },
    },
    {
      name: "Le George",
      address: {
        street: "Av. George V",
        street_number: "31",
        postalCode: 75008,
        city: "Paris",
        country: "France",
      },
      type: { typeId: ObjectId("62324c2aa3ad5feadd302f6c"), name: "Italian" },
    },
    {
      name: "Mavrommatis",
      address: {
        street: "Rue Daubenton",
        street_number: "42",
        postalCode: 75005,
        city: "Paris",
        country: "France",
      },
      type: { typeId: ObjectId("62324c2aa3ad5feadd302f6d"), name: "Greek" },
    },
    {
      name: "Fajitas",
      address: {
        street: "Rue Dauphine",
        street_number: "15",
        postalCode: 75006,
        city: "Paris",
        country: "France",
      },
      type: { typeId: ObjectId("62324c2aa3ad5feadd302f6f"), name: "Mexican" },
    },
    {
      name: "Khajuraho",
      address: {
        street: "Bd de la Tour-Maubourg",
        street_number: "14",
        postalCode: 75007,
        city: "Paris",
        country: "France",
      },
      type: { typeId: ObjectId("62324c2aa3ad5feadd302f6e"), name: "Indian" },
    },
  ],
  {}
);

// reviews collection
db.reviews.insertMany(
  [
    {
      reviever: {
        firstName: "Jacques",
        lastName: "Bonhomme",
      },
      rating: 4,
      text: "Tre bon",
      date: new Date("2022-02-10"),
      restaurant: {
        id: ObjectId("62325779a3ad5feadd302f73"),
        name: "ASPIC",
      },
    },
    {
      reviever: {
        firstName: "Paul",
        lastName: "Gauguin",
      },
      rating: 5,
      text: "Oui c'est très bien",
      date: new Date("2019-09-10"),
      restaurant: {
        id: ObjectId("62325779a3ad5feadd302f73"),
        name: "ASPIC",
      },
    },
    {
      reviever: {
        firstName: "Henri",
        lastName: "Matisse",
      },
      rating: 3,
      text: "La nourriture c'est ok",
      date: new Date("2021-11-28"),
      restaurant: {
        id: ObjectId("62325779a3ad5feadd302f74"),
        name: "Shang Palace",
      },
    },

    {
      reviever: {
        firstName: "Wat",
        lastName: "Tyler",
      },
      rating: 3,
      text: "The slop is passable",
      date: new Date("1999-09-10"),
      restaurant: {
        id: ObjectId("62325779a3ad5feadd302f75"),
        name: "Mosuke",
      },
    },
    {
      reviever: {
        firstName: "Simon",
        lastName: "Sudbury",
      },
      rating: 4,
      text: "Ipsum bonum cibum",
      date: new Date("1994-05-11"),
      restaurant: {
        id: ObjectId("62325779a3ad5feadd302f76"),
        name: "Le George",
      },
    },
    {
      reviever: {
        firstName: "Jan",
        lastName: "Žižka",
      },
      rating: 1,
      text: "Nechutný",
      date: new Date("2001-02-18"),
      restaurant: {
        id: ObjectId("62324c2aa3ad5feadd302f6d"),
        name: "Mavrommatis",
      },
    },
  ],
  {}
);
