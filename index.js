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

const {
  updateCharacter,
  updateRelation,
  updateSource,
  updateImage,
  updateRace,
  updateGender,
} = require("./CRUD/update");

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

app.delete("/character", deleteCharacter);
app.delete("/character/relations", deleteRelation);
app.delete("/character/profile_image", deleteProfileImage);
app.delete("/character/character_in_image", deleteCharacterFromImage);
app.delete("/like", deleteLike);
app.delete("/dislike", deleteDislike);
app.delete("/source", deleteSource);
app.delete("/race", deleteRace);
app.delete("/gender", deleteGender);
app.delete("/image", deleteImage);

app.post("/character", createCharacter);
app.post("/character/profile_image", createProfileImage);
app.post("/character/character_in_image", createCharacterInImage);
app.post("/character/source", createCharacterSource);
app.post("/character/relation", createCharacterRelation);
app.post("/dislike", createDislike);
app.post("/like", createLike);
app.post("/image", createImage);
app.post("/gender", createGender);
app.post("/race", createRace);
app.post("/source", createSource);

app.put("/character", updateCharacter);
app.put("/character/relation", updateRelation);
app.put("/source", updateSource);
app.put("/image", updateImage);
app.put("/race", updateRace);
app.put("/gender", updateGender);

app.listen(3000, () => {
  console.log("online");
});
