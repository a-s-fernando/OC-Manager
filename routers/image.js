const { Router } = require("express");

const { getAllImages } = require("../CRUD/read");
const { deleteImage } = require("../CRUD/delete");
const { createImage } = require("../CRUD/create");
const { updateImage } = require("../CRUD/update");

const imageRouter = Router();

imageRouter.get("/", getAllImages);
imageRouter.delete("/", deleteImage);
imageRouter.post("/", createImage);
imageRouter.put("/", updateImage);

module.exports = imageRouter;
