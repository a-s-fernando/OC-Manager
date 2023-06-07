const client = require("../database/connect");

class Image {
  constructor({ imageid, imageurl }) {
    this.id = imageid;
    this.url = imageurl;
  }

  static async getAll() {
    const data = await client.query("SELECT * FROM image;");
    return data.rows.map((r) => new Image(r));
  }

  static async getOne(id) {
    const data = await client.query("SELECT * FROM image WHERE imageID = $1;", [
      id,
    ]);
    return new Image(data.rows[0]);
  }

  static async create(imageURL) {
    const res = await client.query(
      "INSERT INTO image(imageURL) VALUES ($1) RETURNING *;",
      [imageURL]
    );
    if (res.rows.length != 1) {
      throw new Error("Error creating new image.");
    }
    return new Image(res.rows[0]);
  }

  static async delete(id) {
    const res = await client.query(
      `DELETE FROM image
      WHERE image.imageID = $1;`,
      [id]
    );
  }

  static async update(id, imageURL) {
    const res = await client.query(
      `UPDATE image SET imageURL = $1
      WHERE imageID = $2
      RETURNING *;`,
      [imageURL, id]
    );
    return new Image(res.rows[0]);
  }
}

module.exports = Image;
