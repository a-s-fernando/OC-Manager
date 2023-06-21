const client = require("../database/connect");

class Source {
  constructor({ sourceid, name }) {
    //'sourceid' must be all lowercase in order to be recognised
    this.id = sourceid;
    this.name = name;
  }

  static async getAll() {
    const data = await client.query("SELECT * FROM source;");
    return data.rows.map((r) => new Source(r));
  }

  static async getOne(id) {
    const data = await client.query(
      "SELECT * FROM source WHERE sourceID = $1;",
      [id]
    );
    return new Source(data.rows[0]);
  }

  static async create(name) {
    const res = await client.query(
      "INSERT INTO source(name) VALUES ($1) RETURNING *;",
      [name]
    );
    if (res.rows.length != 1) {
      throw new Error("Error creating new source.");
    }
    return new Source(res.rows[0]);
  }

  static async delete(id) {
    const res = await client.query(
      `DELETE FROM source
      WHERE source.sourceID = $1;`,
      [id]
    );
  }

  static async update(id, name) {
    const res = await client.query(
      `UPDATE source SET name = $1
      WHERE sourceID = $2
      RETURNING *;`,
      [name, id]
    );
    return new Source(res.rows[0]);
  }
}

module.exports = Source;
