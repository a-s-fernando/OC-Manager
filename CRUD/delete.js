const client = require("../database/connect");

async function dbDelete(res, query, args) {
  try {
    await client.query(query, args);

    res.status(200).json({
      message: `Query successful.`,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: `Query failed.`,
    });
  }
}

async function deleteCharacter(req, res) {
  const { id } = req.body;
  await dbDelete(
    res,
    `DELETE FROM character
    WHERE character.characterID = $1`,
    [id]
  );
}

async function deleteLike(req, res) {
  const { id, name } = req.body;
  await dbDelete(
    res,
    `DELETE FROM character_likes
    WHERE character_likes.characterID = $1
    AND character_likes.name = $2`,
    [id, name]
  );
}

async function deleteDislike(req, res) {
  const { id, name } = req.body;
  await dbDelete(
    res,
    `DELETE FROM character_dislikes
    WHERE character_dislikes.characterID = $1
    AND character_dislikes.name = $2`,
    [id, name]
  );
}

async function deleteSource(req, res) {
  const { id } = req.body;
  await dbDelete(
    res,
    `DELETE FROM source
    WHERE source.sourceID = $1`,
    [id]
  );
}

async function deleteRace(req, res) {
  const { id } = req.body;
  await dbDelete(
    res,
    `DELETE FROM source
    WHERE race.raceID = $1`,
    [id]
  );
}

async function deleteGender(req, res) {
  const { id } = req.body;
  await dbDelete(
    res,
    `DELETE FROM source
    WHERE gender.genderID = $1`,
    [id]
  );
}

async function deleteImage(req, res) {
  const { id } = req.body;
  await dbDelete(
    res,
    `DELETE FROM source
    WHERE image.imageID = $1`,
    [id]
  );
}

async function deleteProfileImage(req, res) {
  const { characterID } = req.body;
  await dbDelete(
    res,
    `DELETE FROM character_profile_image
    WHERE character_profile_image.characterID = $1`,
    [characterID]
  );
}

async function deleteCharacterFromImage(req, res) {
  const { imageID, characterID } = req.body;
  await client.query(
    res,
    `DELETE FROM character_in_image
    WHERE character_in_image.imageID = $1
    AND character_in_image.characterID = $2`,
    [imageID, characterID]
  );
}

async function deleteRelation(req, res) {
  const { id } = req.body;
  await dbDelete(
    res,
    `DELETE FROM character_relation
    WHERE character_relation.relationID = $1`,
    [id]
  );
}

module.exports = {
  deleteLike,
  deleteDislike,
  deleteSource,
  deleteRace,
  deleteGender,
  deleteImage,
  deleteProfileImage,
  deleteCharacterFromImage,
  deleteRelation,
  deleteCharacter,
};
