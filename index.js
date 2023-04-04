const express = require("express");
const {
  getAll,
  getOne,
  getRelations,
  getLikes,
  getDislikes,
  getProfile,
  getImages,
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

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ Message: "Welcome to the API." });
});

app.get("/characters", getAll);
app.get("/characters/:id", getOne);
app.get("/characters/:id/relations", getRelations);
app.get("/characters/:id/likes", getLikes);
app.get("/characters/:id/dislikes", getDislikes);
app.get("/characters/:id/profileimage", getProfile);
app.get("/characters/:id/images", getImages);

app.delete("/delete/like", deleteLike);
app.delete("/delete/dislike", deleteDislike);
app.delete("/delete/source", deleteSource);
app.delete("/delete/race", deleteRace);
app.delete("/delete/gender", deleteGender);
app.delete("/delete/image", deleteImage);
app.delete("/delete/profileimage", deleteProfileImage);
app.delete("/delete/characterfromimage", deleteCharacterFromImage);
app.delete("/delete/relation", deleteRelation);
app.delete("/delete/character", deleteCharacter);

app.listen(3000, () => {
  console.log("online");
});
