const { Router } = require("express");

const { getProfile, getImages } = require("../CRUD/read");
const {
  deleteProfileImage,
  deleteCharacterFromImage,
} = require("../CRUD/delete");
const {
  createCharacterInImage,
  createProfileImage,
  createCharacterSource,
} = require("../CRUD/create");
const {
  characterIndex,
  getOne,
  create,
  deleteCharacter,
  update,
} = require("../controllers/character");
const {
  relationIndex,
  getRelations,
  createRelation,
  deleteRelation,
  updateRelation,
} = require("../controllers/relation");
const {
  likeIndex,
  getLikesForCharacter,
  createLike,
  deleteLike,
  updateLike,
} = require("../controllers/like");
const {
  dislikeIndex,
  getDislikesForCharacter,
  createDislike,
  deleteDislike,
  updateDislike,
} = require("../controllers/dislike");

const characterRouter = Router();

characterRouter.get("/", characterIndex);
characterRouter.get("/like", likeIndex);
characterRouter.get("/dislike", dislikeIndex);
characterRouter.get("/relation", relationIndex);
characterRouter.get("/:id/likes", getLikesForCharacter);
characterRouter.get("/:id", getOne);
characterRouter.get("/:id/dislikes", getDislikesForCharacter);
characterRouter.get("/:id/relations", getRelations);
characterRouter.get("/:id/profile_image", getProfile);
characterRouter.get("/:id/images", getImages);

characterRouter.delete("/", deleteCharacter);
characterRouter.delete("/relations", deleteRelation);
characterRouter.delete("/profile_image", deleteProfileImage);
characterRouter.delete("/character_in_image", deleteCharacterFromImage);
characterRouter.delete("/like", deleteLike);
characterRouter.delete("/dislike", deleteDislike);

characterRouter.post("/", create);
characterRouter.post("/profile_image", createProfileImage);
characterRouter.post("/character_in_image", createCharacterInImage);
characterRouter.post("/source", createCharacterSource);
characterRouter.post("/relation", createRelation);
characterRouter.post("/dislike", createDislike);
characterRouter.post("/like", createLike);

characterRouter.put("/", update);
characterRouter.put("/relation", updateRelation);
characterRouter.put("/like", updateLike);
characterRouter.put("/dislike", updateDislike);

module.exports = characterRouter;
