const { Router } = require("express");

const {
  getOne,
  getRelations,
  getLikes,
  getDislikes,
  getProfile,
  getImages,
  getAllCharacters,
} = require("../CRUD/read");
const {
  deleteProfileImage,
  deleteCharacterFromImage,
  deleteRelation,
  deleteCharacter,
  deleteLike,
  deleteDislike,
} = require("../CRUD/delete");
const {
  createCharacter,
  createCharacterInImage,
  createProfileImage,
  createCharacterRelation,
  createCharacterSource,
  createLike,
  createDislike,
} = require("../CRUD/create");
const { updateCharacter, updateRelation } = require("../CRUD/update");

const characterRouter = Router();

characterRouter.get("/", getAllCharacters);
characterRouter.get("/:id", getOne);
characterRouter.get("/:id/relations", getRelations);
characterRouter.get("/:id/likes", getLikes);
characterRouter.get("/:id/dislikes", getDislikes);
characterRouter.get("/:id/profile_image", getProfile);
characterRouter.get("/:id/images", getImages);

characterRouter.delete("/", deleteCharacter);
characterRouter.delete("/relations", deleteRelation);
characterRouter.delete("/profile_image", deleteProfileImage);
characterRouter.delete("/character_in_image", deleteCharacterFromImage);
characterRouter.delete("/like", deleteLike);
characterRouter.delete("/dislike", deleteDislike);

characterRouter.post("/", createCharacter);
characterRouter.post("/profile_image", createProfileImage);
characterRouter.post("/character_in_image", createCharacterInImage);
characterRouter.post("/source", createCharacterSource);
characterRouter.post("/relation", createCharacterRelation);
characterRouter.post("/dislike", createDislike);
characterRouter.post("/like", createLike);

characterRouter.put("/", updateCharacter);
characterRouter.put("/relation", updateRelation);

module.exports = characterRouter;
