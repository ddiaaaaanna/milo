const express = require("express");

const app = express();
const port = 5001;

app.get("/", (req, res) => {
  res.send("Milo API Running");
});

app.listen(port, () => {
  console.log("Server running on port 5001");
});
