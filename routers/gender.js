const { Router } = require("express");

const {
  genderIndex,
  deleteGender,
  create,
  update,
} = require("../controllers/gender");

const genderRouter = Router();

genderRouter.get("/", genderIndex);
genderRouter.delete("/", deleteGender);
genderRouter.post("/", create);
genderRouter.put("/", update);

module.exports = genderRouter;
