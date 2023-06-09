const client = require("../database/connect");

class Dislike {
  constructor({ characterid, name }) {
    this.id = characterid;
    this.name = name;
  }

  static async getAll() {
    const data = await client.query("SELECT * FROM character_dislike;");
    return data.rows.map((r) => new Dislike(r));
  }

  static async getForCharacter(id) {
    const data = await client.query(
      "SELECT * FROM character_dislike WHERE characterid = $1;",
      [id]
    );
    return data.rows.map((r) => new Dislike(r));
  }

  static async create(characterid, name) {
    const res = await client.query(
      "INSERT INTO character_dislike(characterID, name) VALUES ($1, $2) RETURNING *;",
      [characterid, name]
    );
    if (res.rows.length != 1) {
      throw new Error("Error creating new dislike.");
    }
    return new Dislike(res.rows[0]);
  }

  static async delete(characterid, name) {
    const res = await client.query(
      `DELETE FROM character_dislike
      WHERE character_dislike.characterID = $1 AND character_dislike.name = $2;`,
      [characterid, name]
    );
  }

  static async update(characterid, name) {
    const res = await client.query(
      `UPDATE character_dislike SET name = $1
      WHERE characterID = $2
      RETURNING *;`,
      [name, characterid]
    );
    return new Dislike(res.rows[0]);
  }
}

module.exports = Dislike;
