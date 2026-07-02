require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const dogRouter = require("./routes/dogRoutes");
const vetRouter = require("./routes/vetVisitRoutes");
const medicationRouter = require("./routes/medicationRoutes");
const journalRouter = require("./routes/journalRoutes");
const trainingRouter = require("./routes/trainingRoutes");
const userRouter = require("./routes/userRoutes");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(dogRouter);
app.use(vetRouter);
app.use(medicationRouter);
app.use(journalRouter);
app.use(trainingRouter);
app.use(userRouter);
const port = process.env.PORT || 5001;

async function startApp() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("Server running on port 5001");
    });

    console.log("mongoDB connected!");
  } catch (error) {
    console.log(error);
  }
}

startApp();
