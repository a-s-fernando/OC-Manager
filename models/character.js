const client = require("../database/connect");

class Character {
  constructor({
    id,
    name,
    dob,
    personality,
    appearance,
    background,
    gender,
    race,
    ethnicity,
    source,
    profile,
    relationships,
    images,
    dislikes,
    likes,
  }) {
    this.id = id;
    this.name = name;
    this.dob = dob;
    this.personality = personality;
    this.appearance = appearance;
    this.background = background;
    this.gender = gender;
    this.race = race;
    this.ethnicity = ethnicity;
    this.source = source;
    this.profile = profile;
    this.relationships = relationships;
    this.images = images;
    this.dislikes = dislikes;
    this.likes = likes;
  }

  static async getAll() {
    const data = await client.query("SELECT * FROM complete_data;");
    return data.rows.map((r) => new Character(r));
  }

  static async getOne(id) {
    const data = await client.query(
      "SELECT * FROM complete_data WHERE id = $1;",
      [id]
    );
    return new Character(data.rows[0]);
  }

  static async create(
    name,
    dob,
    personality,
    appearance,
    background,
    genderid,
    raceid,
    ethnicity
  ) {
    const res = await client.query(
      "INSERT INTO character(name, dob, personality, appearance, background, genderid, raceid, ethnicity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;",
      [
        name,
        dob,
        personality,
        appearance,
        background,
        genderid,
        raceid,
        ethnicity,
      ]
    );
    if (res.rows.length != 1) {
      throw new Error("Error creating new character.");
    }
    return new Character(res.rows[0]);
  }

  static async delete(id) {
    const res = await client.query(
      `DELETE FROM character
      WHERE character.characterID = $1;`,
      [id]
    );
  }

  static async update(
    id,
    name,
    dob,
    personality,
    appearance,
    background,
    genderid,
    raceid,
    ethnicity
  ) {
    const res = await client.query(
      `UPDATE character SET name = $1, dob = $2, personality = $3, appearance = $4, background = $5, genderID = $6, raceID = $7, ethnicity = $8
      WHERE characterID = $9
      RETURNING *;`,
      [
        name,
        dob,
        personality,
        appearance,
        background,
        genderid,
        raceid,
        ethnicity,
        id,
      ]
    );
    return new Character(res.rows[0]);
  }
}

module.exports = Character;
