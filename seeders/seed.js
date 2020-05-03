const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect("mongodb://localhost/secretDB", {
  useNewUrlParser: true,
  useFindAndModify: false
});

const secretSeed = [
  {
    content: "Word",
    category: "private"
  },
  {
    content: "Word",
    category: "private"
  },
  {
    content: "MMKKK",
    category: "personal"
  },
  {
    content: "MMKKK",
    category: "personal"
  },
  {
    content: "LOLLOL",
    category: "stuff"
  },
  {
    content: "LOLLOL",
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
