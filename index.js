const express = require("express");
const cors = require("cors");

const characterRouter = require("./routers/character");
const genderRouter = require("./routers/gender");
const raceRouter = require("./routers/race");
const imageRouter = require("./routers/image");
const sourceRouter = require("./routers/source");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ Message: "Welcome to the API." });
});

app.use("/character", characterRouter);
app.use("/gender", genderRouter);
app.use("/race", raceRouter);
app.use("/image", imageRouter);
app.use("/source", sourceRouter);

app.listen(3000, () => {
  console.log("online");
});
