const Dislike = require("../models/dislike");

async function dislikeIndex(req, res) {
  try {
    const data = await Dislike.getAll();
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: "Error reading dislikes from DB.",
    });
  }
}

async function getDislikesForCharacter(req, res) {
  try {
    const id = parseInt(req.params.id);
    const data = await Dislike.getForCharacter(id);
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: "Error reading dislikes for that character from DB.",
    });
  }
}

async function createDislike(req, res) {
  const { characterID, name } = req.body;
  try {
    const data = await Dislike.create(characterID, name);

    res.status(201).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: true,
      message: `Error creating new dislike.`,
    });
  }
}

async function deleteDislike(req, res) {
  const { characterID, name } = req.body;
  try {
    await Dislike.delete(characterID, name);
    res.status(200).json({ Message: "Deleted dislike successfully." });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: `Error deleting dislike.`,
    });
  }
}

async function updateDislike(req, res) {
  const { characterID, name } = req.body;
  try {
    await Dislike.update(characterID, name);
    res.status(200).json({ Message: "Updated dislike successfully." });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: true,
      message: `Error updating dislike.`,
    });
  }
}

module.exports = {
  dislikeIndex,
  getDislikesForCharacter,
  createDislike,
  deleteDislike,
  updateDislike,
};
