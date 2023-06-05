const { Router } = require("express");

const {
  sourceIndex,
  deleteSource,
  create,
  update,
} = require("../controllers/source");

const sourceRouter = Router();

sourceRouter.get("/", sourceIndex);
sourceRouter.delete("/", deleteSource);
sourceRouter.post("/", create);
sourceRouter.put("/", update);

module.exports = sourceRouter;
