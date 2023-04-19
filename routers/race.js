const { Router } = require("express");

const { getAllRaces } = require("../CRUD/read");
const { deleteRace } = require("../CRUD/delete");
const { createRace } = require("../CRUD/create");
const { updateRace } = require("../CRUD/update");

const raceRouter = Router();

raceRouter.get("/", getAllRaces);
raceRouter.delete("/", deleteRace);
raceRouter.post("/", createRace);
raceRouter.put("/", updateRace);

module.exports = raceRouter;
