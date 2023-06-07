const client = require("../database/connect");

class Race {
  constructor({ raceid, name }) {
    this.id = raceid;
    this.name = name;
  }

  static async getAll() {
    const data = await client.query("SELECT * FROM race;");
    return data.rows.map((r) => new Race(r));
  }

  static async getOne(id) {
    const data = await client.query("SELECT * FROM race WHERE raceID = $1;", [
      id,
    ]);
    return new Race(data.rows[0]);
  }

  static async create(name) {
    const res = await client.query(
      "INSERT INTO race(name) VALUES ($1) RETURNING *;",
      [name]
    );
    if (res.rows.length != 1) {
      throw new Error("Error creating new race.");
    }
    return new Race(res.rows[0]);
  }

  static async delete(id) {
    const res = await client.query(
      `DELETE FROM race
      WHERE race.raceID = $1;`,
      [id]
    );
  }

  static async update(id, name) {
    const res = await client.query(
      `UPDATE race SET name = $1
      WHERE raceID = $2
      RETURNING *;`,
      [name, id]
    );
    return new Race(res.rows[0]);
  }
}

module.exports = Race;
