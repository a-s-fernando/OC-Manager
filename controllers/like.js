const Like = require("../models/like");

async function likeIndex(req, res) {
  try {
    const data = await Like.getAll();
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: "Error reading likes from DB.",
    });
  }
}

async function getLikesForCharacter(req, res) {
  try {
    const id = parseInt(req.params.id);
    const data = await Like.getForCharacter(id);
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: "Error reading likes for that character from DB.",
    });
  }
}

async function createLike(req, res) {
  const { characterID, name } = req.body;
  try {
    const data = await Like.create(characterID, name);

    res.status(201).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: true,
      message: `Error creating new like.`,
    });
  }
}

async function deleteLike(req, res) {
  const { characterID, name } = req.body;
  try {
    await Like.delete(characterID, name);
    res.status(200).json({ Message: "Deleted like successfully." });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: `Error deleting like.`,
    });
  }
}

async function updateLike(req, res) {
  const { characterID, name } = req.body;
  try {
    await Like.update(characterID, name);
    res.status(200).json({ Message: "Updated like successfully." });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: true,
      message: `Error updating like.`,
    });
  }
}

module.exports = {
  likeIndex,
  getLikesForCharacter,
  createLike,
  deleteLike,
  updateLike,
};
