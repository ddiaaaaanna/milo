require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const dogRouter = require("./routes/dogRoutes");

const app = express();
app.use(express.json());
app.use(dogRouter);
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
