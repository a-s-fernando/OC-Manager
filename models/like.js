const client = require("../database/connect");

class Like {
  constructor({ characterid, name }) {
    this.id = characterid;
    this.name = name;
  }

  static async getAll() {
    const data = await client.query("SELECT * FROM character_like;");
    return data.rows.map((r) => new Like(r));
  }

  static async getForCharacter(id) {
    const data = await client.query(
      "SELECT * FROM character_like WHERE characterid = $1;",
      [id]
    );
    return data.rows.map((r) => new Like(r));
  }

  static async create(characterid, name) {
    const res = await client.query(
      "INSERT INTO character_like(characterID, name) VALUES ($1, $2) RETURNING *;",
      [characterid, name]
    );
    if (res.rows.length != 1) {
      throw new Error("Error creating new like.");
    }
    return new Like(res.rows[0]);
  }

  static async delete(characterid, name) {
    const res = await client.query(
      `DELETE FROM character_like
      WHERE character_like.characterID = $1 AND character_like.name = $2;`,
      [characterid, name]
    );
  }

  static async update(characterid, name) {
    const res = await client.query(
      `UPDATE character_like SET name = $1
      WHERE characterID = $2
      RETURNING *;`,
      [name, characterid]
    );
    return new Like(res.rows[0]);
  }
}

module.exports = Like;
