const Race = require("../models/race");

async function raceIndex(req, res) {
  try {
    const data = await Race.getAll();
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: "Error reading races from DB.",
    });
  }
}

async function getOne(req, res) {
  try {
    const id = parseInt(req.params.id);
    const data = await Race.getOne(id);
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: "Error reading race from DB.",
    });
  }
}

async function create(req, res) {
  const { name } = req.body;
  try {
    const data = await Race.create(name);

    res.status(201).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: true,
      message: `Error creating new race.`,
    });
  }
}

async function deleteRace(req, res) {
  const { id } = req.body;
  try {
    await Race.delete(id);
    res.status(200).json({ Message: "Deleted race successfully." });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: `Error deleting race.`,
    });
  }
}

async function update(req, res) {
  const { id, name } = req.body;
  try {
    await Race.update(id, name);
    res.status(200).json({ Message: "Updated race successfully." });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: true,
      message: `Error updating race.`,
    });
  }
}

module.exports = {
  raceIndex,
  getOne,
  create,
  deleteRace,
  update,
};
