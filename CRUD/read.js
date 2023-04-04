const client = require("../database/connect");

async function getAll(req, res) {
  const data = await client.query(`SELECT * FROM complete_data;`);
  console.log(data.rows);
  res.json(data.rows);
}

async function getOne(req, res) {
  const id = parseInt(req.params.id);
  const data = await client.query(
    `SELECT * FROM complete_data
	  WHERE complete_data.id = $1`,
    [id]
  );
  console.log(data.rows);
  res.send(data.rows);
}

async function getRelations(req, res) {
  const id = parseInt(req.params.id);
  const data = await client.query(
    `SELECT character.characterID, character.name, character_relation.relationship as relationship FROM character
  JOIN character_relation ON character_relation.targetID = character.characterID
  WHERE character_relation.characterID = $1;`,
    [id]
  );
  console.log(data.rows);
  res.send(data.rows);
}

async function getLikes(req, res) {
  const id = parseInt(req.params.id);
  const data = await client.query(
    `SELECT character_likes.name as name FROM character_likes
  JOIN character ON character.characterID = character_likes.characterID
  WHERE character.characterID = $1;`,
    [id]
  );
  console.log(data.rows);
  res.send(data.rows);
}

async function getDislikes(req, res) {
  const id = parseInt(req.params.id);
  const data = await client.query(
    `SELECT character_dislikes.name as name FROM character_dislikes
  JOIN character ON character.characterID = character_dislikes.characterID
  WHERE character.characterID = $1;`,
    [id]
  );
  console.log(data.rows);
  res.send(data.rows);
}

async function getProfile(req, res) {
  const id = parseInt(req.params.id);
  const data = await client.query(
    `SELECT character_dislikes.name as name FROM character_dislikes
  JOIN character ON character.characterID = character_dislikes.characterID
  WHERE character.characterID = $1;`,
    [id]
  );
  console.log(data.rows);
  res.send(data.rows);
}

async function getImages(req, res) {
  const id = parseInt(req.params.id);
  const data = await client.query(
    `SELECT character_dislikes.name as name FROM character_dislikes
  JOIN character ON character.characterID = character_dislikes.characterID
  WHERE character.characterID = $1;`,
    [id]
  );
  console.log(data.rows);
  res.send(data.rows);
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
