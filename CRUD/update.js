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

module.exports = updateCharacter;
