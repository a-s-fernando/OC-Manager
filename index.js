const express = require("express");
const client = require("./database/connect");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the API.");
});

app.get("/characters", async (req, res) => {
  const data =
    await client.query(`SELECT data.*, STRING_AGG(character_dislikes.name,', ') as dislikes FROM
  (SELECT data.*, STRING_AGG(character_likes.name,', ') as likes FROM data
  JOIN character_likes ON character_likes.characterID = data.id
  GROUP BY data.id, data.name, data.dob, data.personality,
  data.appearance, data.background, data.gender, data.race, data.ethnicity, data.source) as data
  JOIN character_dislikes ON character_dislikes.characterID = data.id
  GROUP BY data.id, data.name, data.dob, data.personality,
  data.appearance, data.background, data.gender, data.race, data.ethnicity, data.source, data.likes
  ORDER BY id ASC`);
  console.log(data.rows);
  res.send(data.rows);
});

app.get("/characters/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const data = await client.query(
    `SELECT data.*, STRING_AGG(character_dislikes.name,', ') as dislikes FROM
    (SELECT data.*, STRING_AGG(character_likes.name,', ') as likes FROM data
    JOIN character_likes ON character_likes.characterID = data.id
    GROUP BY data.id, data.name, data.dob, data.personality,
    data.appearance, data.background, data.gender, data.race, data.ethnicity, data.source) as data
    JOIN character_dislikes ON character_dislikes.characterID = data.id
    WHERE data.id = $1
    GROUP BY data.id, data.name, data.dob, data.personality,
    data.appearance, data.background, data.gender, data.race, data.ethnicity, data.source, data.likes
    ORDER BY id ASC;`,
    [id]
  );
  console.log(data.rows);
  res.send(data.rows);
});

app.get("/characters/:id/relations", async (req, res) => {
  const id = parseInt(req.params.id);
  const data = await client.query(
    `SELECT character.characterID, character.name, character_relation.relationship as relationship FROM character
  JOIN character_relation ON character_relation.targetID = character.characterID
  WHERE character_relation.characterID = $1;`,
    [id]
  );
  console.log(data.rows);
  res.send(data.rows);
});

app.get("/characters/:id/likes", async (req, res) => {
  const id = parseInt(req.params.id);
  const data = await client.query(
    `SELECT character_likes.name as name FROM character_likes
  JOIN character ON character.characterID = character_likes.characterID
  WHERE character.characterID = $1;`,
    [id]
  );
  console.log(data.rows);
  res.send(data.rows);
});

app.get("/characters/:id/dislikes", async (req, res) => {
  const id = parseInt(req.params.id);
  const data = await client.query(
    `SELECT character_dislikes.name as name FROM character_dislikes
  JOIN character ON character.characterID = character_dislikes.characterID
  WHERE character.characterID = $1;`,
    [id]
  );
  console.log(data.rows);
  res.send(data.rows);
});

app.listen(3000, () => {
  console.log("online");
});
