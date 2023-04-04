const client = require("../database/connect");

async function deleteLike(req, res) {
  try {
    const { id, name } = req.body;
    await client.query(
      `DELETE FROM character_likes
                WHERE character_likes.characterID = $1
                AND character_likes.name = $2`,
      [id, name]
    );

    res.status(200).json({
      message: `Deleting (${id},${name}) succeeded.`,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: true,
      message: `Deletion failed.`,
    });
  }
}

async function deleteDislike(req, res) {
  try {
    const { id, name } = req.body;
    await client.query(
      `DELETE FROM character_dislikes
                WHERE character_dislikes.characterID = $1
                AND character_dislikes.name = $2`,
      [id, name]
    );

    res.status(200).json({
      message: `Deleting (${id},${name}) succeeded.`,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: true,
      message: `Deletion failed.`,
    });
  }
}

async function deleteSource(req, res) {
  try {
    const { id } = req.body;
    const query = await client.query(
      `DELETE FROM source
                  WHERE source.sourceID = $1`,
      [id]
    );

    res.status(200).json({
      message: `Deleting (${id}) succeeded.`,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: true,
      message: `Deletion failed.`,
    });
  }
}

async function deleteRace(req, res) {
  try {
    const { id } = req.body;
    const query = await client.query(
      `DELETE FROM source
                    WHERE race.raceID = $1`,
      [id]
    );

    res.status(200).json({
      message: `Deleting (${id}) succeeded.`,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: true,
      message: `Deletion failed.`,
    });
  }
}

async function deleteGender(req, res) {
  try {
    const { id } = req.body;
    const query = await client.query(
      `DELETE FROM source
                      WHERE gender.genderID = $1`,
      [id]
    );

    res.status(200).json({
      message: `Deleting (${id}) succeeded.`,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: true,
      message: `Deletion failed.`,
    });
  }
}

async function deleteImage(req, res) {
  try {
    const { id } = req.body;
    const query = await client.query(
      `DELETE FROM source
                        WHERE image.imageID = $1`,
      [id]
    );

    res.status(200).json({
      message: `Deleting (${id}) succeeded.`,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: true,
      message: `Deletion failed.`,
    });
  }
}

async function deleteProfileImage(req, res) {
  try {
    const { imageID, characterID } = req.body;
    await client.query(
      `DELETE FROM character_profile_image
                  WHERE character_profile_image.imageID = $1
                  AND character_profile_image.characterID = $2`,
      [imageID, characterID]
    );

    res.status(200).json({
      message: `Deleting (${id},${name}) succeeded.`,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: true,
      message: `Deletion failed.`,
    });
  }
}

async function deleteCharacterFromImage(req, res) {
  try {
    const { imageID, characterID } = req.body;
    await client.query(
      `DELETE FROM character_in_image
                    WHERE character_in_image.imageID = $1
                    AND character_in_image.characterID = $2`,
      [imageID, characterID]
    );

    res.status(200).json({
      message: `Deleting (${id},${name}) succeeded.`,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: true,
      message: `Deletion failed.`,
    });
  }
}

async function deleteRelation(req, res) {
  try {
    const { id } = req.body;
    const query = await client.query(
      `DELETE FROM character_relation
                          WHERE character_relation.relationID = $1`,
      [id]
    );

    res.status(200).json({
      message: `Deleting (${id}) succeeded.`,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: true,
      message: `Deletion failed.`,
    });
  }
}

async function deleteCharacter(req, res) {
  try {
    const { id } = req.body;
    const query = await client.query(
      `DELETE FROM character
                            WHERE character.characterID = $1`,
      [id]
    );

    res.status(200).json({
      message: `Deleting (${id}) succeeded.`,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: true,
      message: `Deletion failed.`,
    });
  }
}

module.exports = {
  deleteLike,
  deleteDislike,
  deleteSource,
  deleteRace,
  deleteGender,
  deleteImage,
  deleteProfileImage,
  deleteCharacterFromImage,
  deleteRelation,
  deleteCharacter,
};
