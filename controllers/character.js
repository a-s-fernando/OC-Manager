const Character = require("../models/character");

async function characterIndex(req, res) {
  try {
    const data = await Character.getAll();
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: "Error reading characters from DB.",
    });
  }
}

async function getOne(req, res) {
  try {
    const id = parseInt(req.params.id);
    const data = await Character.getOne(id);
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: "Error reading character from DB.",
    });
  }
}

async function create(req, res) {
  const {
    name,
    dob,
    personality,
    appearance,
    background,
    genderid,
    raceid,
    ethnicity,
  } = req.body;
  try {
    const data = await Character.create(
      name,
      dob,
      personality,
      appearance,
      background,
      genderid,
      raceid,
      ethnicity
    );

    res.status(201).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: true,
      message: `Error creating new character.`,
    });
  }
}

async function deleteCharacter(req, res) {
  const { id } = req.body;
  try {
    await Character.delete(id);
    res.status(200).json({ Message: "Deleted character successfully." });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: `Error deleting character.`,
    });
  }
}

async function update(req, res) {
  const {
    id,
    name,
    dob,
    personality,
    appearance,
    background,
    genderid,
    raceid,
    ethnicity,
  } = req.body;
  try {
    await Character.update(
      id,
      name,
      dob,
      personality,
      appearance,
      background,
      genderid,
      raceid,
      ethnicity
    );
    res.status(200).json({ Message: "Updated character successfully." });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: true,
      message: `Error updating character.`,
    });
  }
}

module.exports = {
  characterIndex,
  getOne,
  create,
  deleteCharacter,
  update,
};
