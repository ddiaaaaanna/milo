require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

const app = express();
const port = process.env.PORT || 5001;

async function startApp() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("Server running on port 5001");
    });

    console.log("mongoDB connected");
  } catch (error) {
    console.log(error);
  }
}

startApp();

app.get("/", (req, res) => {
  res.send("Milo API Running");
});
