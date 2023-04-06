const client = require("../database/connect");

async function getAll(req, res) {
  const data = await client.query(`SELECT * FROM complete_data;`);
  console.log(data.rows);
  res.json(data.rows);
}
async function getFromID(req, res, query) {
  try {
    const id = parseInt(req.params.id);
    const data = await client.query(query, [id]);
    console.log(data.rows);
    res.send(data.rows);
  } catch (err) {
    res.sendStatus(404);
  }
}

async function getOne(req, res) {
  getFromID(
    req,
    res,
    `SELECT * FROM complete_data
	  WHERE complete_data.id = $1;`
  );
}

async function getRelations(req, res) {
  getFromID(
    req,
    res,
    `SELECT character.characterID, character.name, character_relation.relationship as relationship FROM character
  JOIN character_relation ON character_relation.targetID = character.characterID
  WHERE character_relation.characterID = $1;`
  );
}

async function getLikes(req, res) {
  getFromID(
    req,
    res,
    `SELECT character_likes.name as name FROM character_likes
  JOIN character ON character.characterID = character_likes.characterID
  WHERE character.characterID = $1;`
  );
}

async function getDislikes(req, res) {
  getFromID(
    req,
    res,
    `SELECT character_dislikes.name as name FROM character_dislikes
  JOIN character ON character.characterID = character_dislikes.characterID
  WHERE character.characterID = $1;`
  );
}

async function getProfile(req, res) {
  getFromID(
    req,
    res,
    `SELECT image.imageURL as profile FROM image
  JOIN character_profile_image ON character_profile_image.imageID = image.imageID
  WHERE character_profile_image.characterID = $1;`
  );
}

async function getImages(req, res) {
  getFromID(
    req,
    res,
    `SELECT images FROM complete_data
  WHERE id = $1;`
  );
}

module.exports = {
  getAll,
  getOne,
  getRelations,
  getLikes,
  getDislikes,
  getProfile,
  getImages,
};
