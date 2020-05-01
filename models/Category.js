const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  secrets:
    [
      {
        type: Schema.Types.ObjectId,
        ref: "Secret"
      }
    ]
})

const Category = mongoose.model("Category", CategorySchema)
module.exports = Category;