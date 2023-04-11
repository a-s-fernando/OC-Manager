const client = require("../database/connect");

async function dbCreate(res, query, args) {
  try {
    await client.query(query, args);

    res.status(200).json({
      message: `Query successful.`,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: true,
      message: `Query failed.`,
    });
  }
}

async function createCharacter(req, res) {
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
  await dbCreate(
    res,
    `INSERT INTO character(name, dob, personality, appearance, background, genderID, raceID, ethnicity)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [
      name,
      dob,
      personality,
      appearance,
      background,
      genderID,
      raceID,
      ethnicity,
    ]
  );
}

async function createDislike(req, res) {
  const { characterID, name } = req.body;
  await client.query(
    res,
    `INSERT INTO character_dislikes(characterid, name)
    VALUES ($1, $2)`,
    [characterID, name]
  );
}

async function createLike(req, res) {
  const { characterID, name } = req.body;
  await client.query(
    res,
    `INSERT INTO character_likes(characterid, name)
    VALUES ($1, $2)`,
    [characterID, name]
  );
}

async function createCharacterInImage(req, res) {
  const { imageID, characterID } = req.body;
  await client.query(
    res,
    `INSERT INTO character_in_image(imageID, characterID)
    VALUES ($1, $2)`,
    [imageID, characterID]
  );
}

async function createProfileImage(req, res) {
  const { imageID, characterID } = req.body;
  await client.query(
    res,
    `INSERT INTO character_profile_image(imageID, characterID)
    VALUES ($1, $2)`,
    [imageID, characterID]
  );
}

async function createCharacterRelation(req, res) {
  const { characterID, targetID, relationship } = req.body;
  await client.query(
    res,
    `INSERT INTO character_relation(characterID, targetID, relationship)
    VALUES ($1, $2, $3)`,
    [characterID, targetID, relationship]
  );
}

async function createCharacterRelation(req, res) {
  const { characterID, targetID, relationship } = req.body;
  await client.query(
    res,
    `INSERT INTO character_relation(characterID, targetID, relationship)
    VALUES ($1, $2, $3)`,
    [characterID, targetID, relationship]
  );
}

async function createCharacterSource(req, res) {
  const { characterID, sourceID } = req.body;
  await client.query(
    res,
    `INSERT INTO character_source(characterID, sourceID)
    VALUES ($1, $2)`,
    [characterID, sourceID]
  );
}

async function createGender(req, res) {
  const { name } = req.body;
  await client.query(
    res,
    `INSERT INTO gender(name)
    VALUES ($1)`,
    [name]
  );
}

async function createImage(req, res) {
  const { imageurl } = req.body;
  await client.query(
    res,
    `INSERT INTO image(imageurl)
    VALUES ($1)`,
    [imageurl]
  );
}

async function createRace(req, res) {
  const { name } = req.body;
  await client.query(
    res,
    `INSERT INTO race(name)
    VALUES ($1)`,
    [name]
  );
}

async function createSource(req, res) {
  const { name } = req.body;
  await client.query(
    res,
    `INSERT INTO source(name)
    VALUES ($1)`,
    [name]
  );
}

module.exports = {
  createCharacter,
  createDislike,
  createLike,
  createCharacterInImage,
  createProfileImage,
  createCharacterRelation,
  createCharacterSource,
  createGender,
  createImage,
  createRace,
  createSource,
};
