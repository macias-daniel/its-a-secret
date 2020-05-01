const express = require("express")
const mongoose = require("mongoose")
const apiRouter = require("./controller/api")


const PORT = process.env.PORT || 3000
const app = express();

mongoose.set("debug", true)
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/secretDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});


app.use(express.static("public", { "extensions": "html" }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use(apiRouter);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`)
});

