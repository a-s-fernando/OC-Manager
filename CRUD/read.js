const client = require("../database/connect");
const format = require("pg-format");

async function getAll(req, res, table) {
  try {
    query = format(`SELECT * FROM %I`, table);
    const data = await client.query(query);
    console.log(data.rows);
    res.json(data.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

async function getFromID(req, res, query) {
  try {
    const id = parseInt(req.params.id);
    const data = await client.query(query, [id]);
    console.log(data.rows);
    res.send(data.rows);
  } catch (err) {
    console.log(err);
    if (err.message.includes("invalid input")) {
      res.sendStatus(400);
    } else {
      res.sendStatus(500);
    }
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

async function getAllCharacters(req, res) {
  getAll(req, res, "complete_data");
}

async function getAllImages(req, res) {
  getAll(req, res, "image");
}

async function getAllGenders(req, res) {
  getAll(req, res, "gender");
}

async function getAllRaces(req, res) {
  getAll(req, res, "race");
}

async function getAllSources(req, res) {
  getAll(req, res, "source");
}

module.exports = {
  getOne,
  getRelations,
  getLikes,
  getDislikes,
  getProfile,
  getImages,
  getAllCharacters,
  getAllGenders,
  getAllImages,
  getAllRaces,
  getAllSources,
};
