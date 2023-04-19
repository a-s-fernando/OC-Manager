const { Router } = require("express");

const { getAllSources } = require("../CRUD/read");
const { deleteSource } = require("../CRUD/delete");
const { createSource } = require("../CRUD/create");
const { updateSource } = require("../CRUD/update");

const sourceRouter = Router();

sourceRouter.get("/", getAllSources);
sourceRouter.delete("/", deleteSource);
sourceRouter.post("/", createSource);
sourceRouter.put("/", updateSource);

module.exports = sourceRouter;
