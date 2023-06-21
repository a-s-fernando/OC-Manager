const Image = require("../models/image");

async function imageIndex(req, res) {
  try {
    const data = await Image.getAll();
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: "Error reading images from DB.",
    });
  }
}

async function getOne(req, res) {
  try {
    const id = parseInt(req.params.id);
    const data = await Image.getOne(id);
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: "Error reading image from DB.",
    });
  }
}

async function create(req, res) {
  const { imageURL } = req.body;
  try {
    const data = await Image.create(imageURL);

    res.status(201).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: true,
      message: `Error creating new image.`,
    });
  }
}

async function deleteImage(req, res) {
  const { id } = req.body;
  try {
    await Image.delete(id);
    res.status(200).json({ Message: "Deleted image successfully." });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: `Error deleting image.`,
    });
  }
}

async function update(req, res) {
  const { id, imageURL } = req.body;
  try {
    await Image.update(id, imageURL);
    res.status(200).json({ Message: "Updated image successfully." });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: true,
      message: `Error updating image.`,
    });
  }
}

module.exports = {
  imageIndex,
  getOne,
  create,
  deleteImage,
  update,
};
