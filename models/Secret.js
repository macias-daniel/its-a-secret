const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const SecretSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  }
})


const Secret = mongoose.model("Secret", SecretSchema)
module.exports = Secret;
