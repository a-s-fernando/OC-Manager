const { Router } = require("express");

const {
  genderIndex,
  getOne,
  deleteGender,
  create,
  update,
} = require("../controllers/gender");

const genderRouter = Router();

genderRouter.get("/", genderIndex);
genderRouter.get("/:id", getOne);
genderRouter.delete("/", deleteGender);
genderRouter.post("/", create);
genderRouter.put("/", update);

module.exports = genderRouter;
