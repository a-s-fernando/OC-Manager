const { Router } = require("express");

const {
  sourceIndex,
  deleteSource,
  create,
  update,
  getOne,
} = require("../controllers/source");

const sourceRouter = Router();

sourceRouter.get("/", sourceIndex);
sourceRouter.get("/:id", getOne);
sourceRouter.delete("/", deleteSource);
sourceRouter.post("/", create);
sourceRouter.put("/", update);

module.exports = sourceRouter;
