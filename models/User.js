const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const userSchema = new Schema({
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Secret"
    }
  ]
})


const User = mongoose.model("User", userSchema)
module.exports = Secret;
