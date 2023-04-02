const express = require("express");

const app = express();
app.get("/", async (req, res) => {
  console.log("endpoint hit");
  res.send("Hello from the API.");
});

app.listen(3000, () => {
  console.log("online");
});
