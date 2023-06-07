const client = require("../database/connect");

class Gender {
  constructor({ genderid, name }) {
    this.id = genderid;
    this.name = name;
  }

  static async getAll() {
    const data = await client.query("SELECT * FROM gender;");
    return data.rows.map((r) => new Gender(r));
  }

  static async getOne(id) {
    const data = await client.query(
      "SELECT * FROM gender WHERE genderID = $1;",
      [id]
    );
    return new Gender(data.rows[0]);
  }

  static async create(name) {
    const res = await client.query(
      "INSERT INTO gender(name) VALUES ($1) RETURNING *;",
      [name]
    );
    if (res.rows.length != 1) {
      throw new Error("Error creating new gender.");
    }
    return new Gender(res.rows[0]);
  }

  static async delete(id) {
    const res = await client.query(
      `DELETE FROM gender
      WHERE gender.genderID = $1;`,
      [id]
    );
  }

  static async update(id, name) {
    const res = await client.query(
      `UPDATE gender SET name = $1
      WHERE genderID = $2
      RETURNING *;`,
      [name, id]
    );
    return new Gender(res.rows[0]);
  }
}

module.exports = Gender;
