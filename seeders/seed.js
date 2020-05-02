const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect("mongodb://localhost/secretDB", {
  useNewUrlParser: true,
  useFindAndModify: false
});

const secretSeed = [
  {
    secretContent: "Word",
    category: "private"
  },
  {
    secretContent: "Word",
    category: "private"
  },
  {
    secretContent: "MMKKK",
    category: "personal"
  },
  {
    secretContent: "MMKKK",
    category: "personal"
  },
  {
    secretContent: "LOLLOL",
    category: "stuff"
  },
  {
    secretContent: "LOLLOL",
    category: "stuff"
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
