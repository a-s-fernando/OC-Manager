const { Router } = require("express");

const {
  imageIndex,
  getOne,
  deleteImage,
  create,
  update,
} = require("../controllers/image");

const imageRouter = Router();

imageRouter.get("/", imageIndex);
imageRouter.get("/:id", getOne);
imageRouter.delete("/", deleteImage);
imageRouter.post("/", create);
imageRouter.put("/", update);

module.exports = imageRouter;
