const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const SecretSchema = new Schema({
  secretContent: {
    type: String,
    require: true
  },
  catergory: {
    type: String,
    require: true
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  }
})


const Secret = mongoose.model("Secret", SecretSchema)
module.exports = Secret;
