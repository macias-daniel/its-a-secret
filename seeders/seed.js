const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect("mongodb://localhost/secretDB", {
  useNewUrlParser: true,
  useFindAndModify: false
});

const secretSeed = [
  {
    secretContent: "Word",
    category: "Private"
  },
  {
    secretContent: "MMKKK",
    category: "Personal"
  },
  {
    secretContent: "LOLLOL",
    category: "Stuff"
  }
];

db.Secret.deleteMany({})
  .then(() => db.Secret.collection.insertMany(secretSeed))
  .then(data => {
    console.log(`${data.result.n} records inserted!`);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
