const Source = require("../models/source");

async function sourceIndex(req, res) {
  try {
    const data = await Source.getAll();
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: "Error reading sources from DB.",
    });
  }
}

async function create(req, res) {
  const { name } = req.body;
  try {
    const data = await Source.create(name);

    res.status(201).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: true,
      message: `Error creating new source.`,
    });
  }
}

async function deleteSource(req, res) {
  const { id } = req.body;
  try {
    await Source.delete(id);
    res.status(200).json({ Message: "Deleted source successfully." });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: `Error deleting source.`,
    });
  }
}

async function update(req, res) {
  const { id, name } = req.body;
  try {
    await Source.update(id, name);
    res.status(200).json({ Message: "Updated source successfully." });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: true,
      message: `Error updating source.`,
    });
  }
}

module.exports = {
  sourceIndex,
  create,
  deleteSource,
  update,
};
