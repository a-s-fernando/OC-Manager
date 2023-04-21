const client = require("../database/connect");

async function dbUpdate(res, query, args) {
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

async function updateCharacter(req, res) {
  const {
    characterID,
    name,
    dob,
    personality,
    appearance,
    background,
    genderID,
    raceID,
    ethnicity,
  } = req.body;
  await dbUpdate(
    res,
    `UPDATE character SET name = $1, dob = $2, personality = $3, appearance = $4, background = $5, genderID = $6, raceID = $7, ethnicity = $8
    WHERE characterID = $9`,
    [
      name,
      dob,
      personality,
      appearance,
      background,
      genderID,
      raceID,
      ethnicity,
      characterID,
    ]
  );
}

async function updateRelation(req, res) {
  const { relationID, relationship } = req.body;
  await dbUpdate(
    res,
    `UPDATE character_relation SET relationship = $1
    WHERE relationID = $2`,
    [relationID, relationship]
  );
}

async function updateSource(req, res) {
  const { id, name } = req.body;
  await dbUpdate(
    res,
    `UPDATE source SET name = $1
    WHERE sourceID = $2`,
    [name, id]
  );
}

async function updateImage(req, res) {
  const { id, imageURL } = req.body;
  await dbUpdate(
    res,
    `UPDATE image SET imageURL = $1
    WHERE imageID = $2`,
    [imageURL, id]
  );
}

async function updateRace(req, res) {
  const { id, name } = req.body;
  await dbUpdate(
    res,
    `UPDATE race SET name = $1
    WHERE raceID = $2`,
    [name, id]
  );
}

async function updateGender(req, res) {
  const { id, name } = req.body;
  await dbUpdate(
    res,
    `UPDATE gender SET name = $1
    WHERE genderID = $2`,
    [name, id]
  );
}

module.exports = {
  updateCharacter,
  updateRelation,
  updateSource,
  updateImage,
  updateRace,
  updateGender,
};
