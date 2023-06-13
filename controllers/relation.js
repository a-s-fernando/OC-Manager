const Relation = require("../models/relation");

async function relationIndex(req, res) {
  try {
    const data = await Relation.getAll();
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: "Error reading relationships from DB.",
    });
  }
}

async function getRelations(req, res) {
  try {
    const id = parseInt(req.params.id);
    const data = await Relation.getRelations(id);
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: "Error reading relationship from DB.",
    });
  }
}

async function createRelation(req, res) {
  const { characterid, targetid } = req.body;
  try {
    const data = await Relation.create(characterid, targetid);

    res.status(201).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: true,
      message: `Error creating new relationship.`,
    });
  }
}

async function deleteRelation(req, res) {
  const { id } = req.body;
  try {
    await Relation.delete(id);
    res.status(200).json({ Message: "Deleted relationship successfully." });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: `Error deleting relationship.`,
    });
  }
}

async function updateRelation(req, res) {
  const { id, relationship } = req.body;
  try {
    await Relation.update(id, relationship);
    res.status(200).json({ Message: "Updated relationship successfully." });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: true,
      message: `Error updating relationship.`,
    });
  }
}

module.exports = {
  relationIndex,
  getRelations,
  createRelation,
  deleteRelation,
  updateRelation,
};
