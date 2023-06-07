const { Router } = require("express");

const {
  raceIndex,
  deleteRace,
  create,
  update,
  getOne,
} = require("../controllers/race");

const raceRouter = Router();

raceRouter.get("/", raceIndex);
raceRouter.get("/:id", getOne);
raceRouter.delete("/", deleteRace);
raceRouter.post("/", create);
raceRouter.put("/", update);

module.exports = raceRouter;
