const express = require("express");
const {
  getOne,
  getRelations,
  getLikes,
  getDislikes,
  getProfile,
  getImages,
  getAllCharacters,
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
  deleteProfileImage,
  deleteCharacterFromImage,
  deleteRelation,
  deleteCharacter,
} = require("./CRUD/delete");
const {
  createCharacter,
  createDislike,
  createLike,
  createCharacterInImage,
  createProfileImage,
  createCharacterRelation,
  createCharacterSource,
  createGender,
  createImage,
  createRace,
  createSource,
} = require("./CRUD/create");

const updateCharacter = require("./CRUD/update");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ Message: "Welcome to the API." });
});

app.get("/character", getAllCharacters);
app.get("/character/:id", getOne);
app.get("/character/:id/relations", getRelations);
app.get("/character/:id/likes", getLikes);
app.get("/character/:id/dislikes", getDislikes);
app.get("/character/:id/profile_image", getProfile);
app.get("/character/:id/images", getImages);
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
app.delete("/profile_image", deleteProfileImage);
app.delete("/character_in_image", deleteCharacterFromImage);
app.delete("/relations", deleteRelation);
app.delete("/character", deleteCharacter);

app.post("/character", createCharacter);
app.post("/dislike", createDislike);
app.post("/like", createLike);
app.post("/image", createImage);
app.post("/profile_image", createProfileImage);
app.post("/character_in_image", createCharacterInImage);
app.post("/gender", createGender);
app.post("/race", createRace);
app.post("/source", createSource);
app.post("/character_source", createCharacterSource);
app.post("/character", createCharacter);
app.post("/relation", createCharacterRelation);

app.put("/character", updateCharacter);

app.listen(3000, () => {
  console.log("online");
});
