const express = require("express");
const db = require("../models");
const router = express.Router();

//Get all secrets
router.get("/api/secret", (req, res) => {
  db.Secret.find({}).then(secrets => {
    res.json(secrets)
  }).catch(err => {
    console.log(err)
    res.sendStatus(500)
  })
})

//Get a random secret
router.get("/api/secret/random", (req, res) => {
  db.Secret.count({}).then(count => {
    const randomSecret = Math.floor(Math.random() * count)
    db.Secret.findOne().skip(randomSecret).then(secret => {
      console.log(secret)
      res.end()
    })
    res.end()
  }).catch(err => {
    console.log(err)
    res.sendStatus(500)

  })
})

//Get all secrets in a category
router.get("/api/secret/:category", (req, res) => {
  db.Secret.find({ category: req.params.category }).then(secrets => {
    res.json(secrets)
  }).catch(err => {
    console.log(err)
    res.sendStatus(500)
  })
})

//Post a new secret
router.post("/api/secret", (req, res) => {
  db.Secret.insertMany(req.body).then(secret => {
    res.json(secret)
  }).catch(err => {
    console.log(err)
    res.sendStatus(500)
  })
})

module.exports = router;