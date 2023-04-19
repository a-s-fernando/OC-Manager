const express = require("express");
const {
  getAllGenders,
  getAllImages,
  getAllRaces,
  getAllSources,
} = require("./CRUD/read");
const {
  deleteLike,
  deleteDislike,
  deleteSource,
  deleteRace,
  deleteGender,
  deleteImage,
} = require("./CRUD/delete");
const {
  createDislike,
  createLike,
  createGender,
  createImage,
  createRace,
  createSource,
} = require("./CRUD/create");
const {
  updateSource,
  updateImage,
  updateRace,
  updateGender,
} = require("./CRUD/update");

const characterRouter = require("./routers/character");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ Message: "Welcome to the API." });
});

app.use("/character", characterRouter);

app.get("/gender", getAllGenders);
app.get("/image", getAllImages);
app.get("/race", getAllRaces);
app.get("/source", getAllSources);

app.delete("/like", deleteLike);
app.delete("/dislike", deleteDislike);
app.delete("/source", deleteSource);
app.delete("/race", deleteRace);
app.delete("/gender", deleteGender);
app.delete("/image", deleteImage);

app.post("/dislike", createDislike);
app.post("/like", createLike);
app.post("/image", createImage);
app.post("/gender", createGender);
app.post("/race", createRace);
app.post("/source", createSource);

app.put("/source", updateSource);
app.put("/image", updateImage);
app.put("/race", updateRace);
app.put("/gender", updateGender);

app.listen(3000, () => {
  console.log("online");
});
