const { Router } = require("express");

const { getAllGenders } = require("../CRUD/read");
const { deleteGender } = require("../CRUD/delete");
const { createGender } = require("../CRUD/create");
const { updateGender } = require("../CRUD/update");

const genderRouter = Router();

genderRouter.get("/", getAllGenders);
genderRouter.delete("/", deleteGender);
genderRouter.post("/", createGender);
genderRouter.put("/", updateGender);

module.exports = genderRouter;
