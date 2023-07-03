const Character = require("../models/character");

async function characterIndex(req, res) {
  try {
    let name = req.query.name;
    let gender = req.query.gender;
    let source = req.query.source;
    let race = req.query.race;
    const data = await Character.getAll(name, gender, source, race);
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

async function getImages(req, res) {
  try {
    const id = parseInt(req.params.id);
    const data = await Character.getImages(id);
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: "Error reading character images from DB.",
    });
  }
}

async function getProfileImage(req, res) {
  try {
    const id = parseInt(req.params.id);
    const data = await Character.getProfileImage(id);
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: "Error reading profile image from DB.",
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
    genderID,
    raceID,
    ethnicity,
  } = req.body;
  try {
    const data = await Character.create(
      name,
      dob,
      personality,
      appearance,
      background,
      genderID,
      raceID,
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

async function createCharacterSource(req, res) {
  const { characterID, sourceID } = req.body;
  try {
    await Character.createCharacterSource(characterID, sourceID);
    res.status(200).json({ Message: "Created source successfully." });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: `Error creating character source.`,
    });
  }
}

async function createCharacterImage(req, res) {
  const { imageID, characterID } = req.body;
  try {
    await Character.createCharacterImage(imageID, characterID);
    res.status(200).json({ Message: "Created character image successfully." });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: `Error creating character image.`,
    });
  }
}

async function createProfileImage(req, res) {
  const { imageID, characterID } = req.body;
  try {
    await Character.createProfileImage(imageID, characterID);
    res.status(200).json({ Message: "Created profile image successfully." });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: `Error creating profile image.`,
    });
  }
}

async function deleteCharacterImage(req, res) {
  const { imageID, characterID } = req.body;
  try {
    await Character.deleteCharacterImage(imageID, characterID);
    res.status(200).json({ Message: "Deleted character image successfully." });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: `Error deleting character image.`,
    });
  }
}

async function deleteProfileImage(req, res) {
  const { id } = req.body;
  try {
    await Character.deleteProfileImage(id);
    res.status(200).json({ Message: "Deleted profile image successfully." });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: `Error deleting profile image.`,
    });
  }
}

async function deleteCharacterSource(req, res) {
  const { sourceID, characterID } = req.body;
  try {
    await Character.deleteCharacterSource(sourceID, characterID);
    res.status(200).json({ Message: "Deleted character source successfully." });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: `Error deleting character source.`,
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
    genderID,
    raceID,
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
      genderID,
      raceID,
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
  createCharacterSource,
  createCharacterImage,
  createProfileImage,
  deleteCharacterImage,
  deleteProfileImage,
  deleteCharacterSource,
  getImages,
  getProfileImage,
};
