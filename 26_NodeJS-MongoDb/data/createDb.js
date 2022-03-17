// run into mongosh
// create db => `use blog`

// authors collection
db.authors.insertMany(
  [
    {name: "Dante Alighieri", email: "alighieridante@email.com"},
    {name: "Giovanni Verga", email: "vergagiovanni@email.com"},
    {name: "Eugenio Montale", email: "montaleeugenio@email.com"},
    {name: "Giacomo Leopardi", email: "leopardigiacomo@email.com"},
    {name: "Italo Calvino", email: "calvinoitalo@email.com"},
  ],
  {}
);