const Gender = require("../models/gender");

async function genderIndex(req, res) {
  try {
    const data = await Gender.getAll();
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: "Error reading genders from DB.",
    });
  }
}

async function create(req, res) {
  const { name } = req.body;
  try {
    const data = await Gender.create(name);

    res.status(201).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: true,
      message: `Error creating new gender.`,
    });
  }
}

async function deleteGender(req, res) {
  const { id } = req.body;
  try {
    await Gender.delete(id);
    res.status(200).json({ Message: "Deleted gender successfully." });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: `Error deleting gender.`,
    });
  }
}

async function update(req, res) {
  const { id, name } = req.body;
  try {
    await Gender.update(id, name);
    res.status(200).json({ Message: "Updated gender successfully." });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: true,
      message: `Error updating gender.`,
    });
  }
}

module.exports = {
  genderIndex,
  create,
  deleteGender,
  update,
};
