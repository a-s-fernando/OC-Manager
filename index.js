const express = require("express");
const client = require("./database/connect");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the API.");
});

app.get("/characters", async (req, res) => {
  console.log("endpoint hit");
  const data =
    await client.query(`SELECT character.characterID, character.name, dob, personality, appearance, background,
  gender.name as gender, race.name as race, ethnicity, STRING_AGG(source.name,', ') as source FROM character
  FULL OUTER JOIN gender ON gender.genderID = character.genderID
  FULL OUTER JOIN race ON race.raceID = character.raceID
  FULL OUTER JOIN character_source ON character_source.characterID = character.characterID
  FULL OUTER JOIN source ON character_source.sourceID = source.sourceID
  GROUP BY character.characterID, gender.name, race.name;`);
  console.log(data.rows);
  res.send(data.rows);
});

app.listen(3000, () => {
  console.log("online");
});
