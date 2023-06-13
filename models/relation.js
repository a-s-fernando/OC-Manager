const client = require("../database/connect");

class Relation {
  constructor({ relationid, characterid, targetid, relationship }) {
    this.id = relationid;
    this.characterid = characterid;
    this.targetid = targetid;
    this.relationship = relationship;
  }

  static async getAll() {
    const data = await client.query("SELECT * FROM character_relation;");
    return data.rows.map((r) => new Relation(r));
  }

  static async getRelations(id) {
    const data = await client.query(
      "SELECT * FROM character_relation WHERE characterid = $1;",
      [id]
    );
    return data.rows.map((r) => new Relation(r));
  }

  static async create(characterid, targetid, relationship) {
    const res = await client.query(
      "INSERT INTO character_relation(characterID, targetID, relationship) VALUES ($1, $2, $3) RETURNING *;",
      [characterid, targetid, relationship]
    );
    if (res.rows.length != 1) {
      throw new Error("Error creating new relation.");
    }
    return new Relation(res.rows[0]);
  }

  static async delete(relationid) {
    const res = await client.query(
      `DELETE FROM character_relation
      WHERE character_relation.relationid = $1;`,
      [relationid]
    );
  }

  static async update(relationid, relationship) {
    const res = await client.query(
      `UPDATE character_relation SET relationship = $1
      WHERE relationID = $2
      RETURNING *;`,
      [relationship, relationid]
    );
    return new Like(res.rows[0]);
  }
}

module.exports = Relation;
