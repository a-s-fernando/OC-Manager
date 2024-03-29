DROP VIEW IF EXISTS complete_data;
DROP VIEW IF EXISTS data;
DROP TABLE IF EXISTS character_source;
DROP TABLE IF EXISTS source;
DROP TABLE IF EXISTS character_dislike;
DROP TABLE IF EXISTS character_like;
DROP TABLE IF EXISTS character_profile_image;
DROP TABLE IF EXISTS character_in_image;
DROP TABLE IF EXISTS image;
DROP TABLE IF EXISTS character_relation;
DROP TABLE IF EXISTS character;
DROP TABLE IF EXISTS race;
DROP TABLE IF EXISTS gender;

CREATE TABLE IF NOT EXISTS race (
	raceID INT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(50) NOT NULL UNIQUE,
	PRIMARY KEY (raceID)
);

CREATE TABLE IF NOT EXISTS gender (
	genderID INT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(50) NOT NULL UNIQUE,
	PRIMARY KEY (genderID)
);

CREATE TABLE IF NOT EXISTS character (
	characterID INT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(100) NOT NULL,
	dob DATE,
	personality TEXT,
	appearance TEXT,
	background TEXT,
	genderID int,
	raceID int,
	ethnicity VARCHAR(25),
	PRIMARY KEY (characterID),
	FOREIGN KEY (genderID) REFERENCES gender(genderID) ON DELETE CASCADE,
	FOREIGN KEY (raceID) REFERENCES race(raceID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS source (
	sourceID INT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(100) UNIQUE NOT NULL,
	PRIMARY KEY (sourceID)
);

CREATE TABLE IF NOT EXISTS character_source (
	characterID INT NOT NULL,
	sourceID INT NOT NULL,
	FOREIGN KEY (characterID) REFERENCES character(characterID) ON DELETE CASCADE,
	FOREIGN KEY (sourceID) REFERENCES source(sourceID) ON DELETE CASCADE,
	UNIQUE (characterID, sourceID)
);


CREATE TABLE IF NOT EXISTS character_like (
	characterID INT NOT NULL,
	name VARCHAR(50) NOT NULL,
	FOREIGN KEY (characterID) REFERENCES character(characterID) ON DELETE CASCADE,
	UNIQUE (characterID, name)
);

CREATE TABLE IF NOT EXISTS character_dislike (
	characterID INT NOT NULL,
	name VARCHAR(50) NOT NULL,
	FOREIGN KEY (characterID) REFERENCES character(characterID) ON DELETE CASCADE,
	UNIQUE (characterID, name)
);

CREATE TABLE IF NOT EXISTS image (
	imageID INT GENERATED ALWAYS AS IDENTITY,
	imageURL VARCHAR(500) UNIQUE NOT NULL,
	PRIMARY KEY (imageID)
);

CREATE TABLE IF NOT EXISTS character_profile_image (
	imageID INT NOT NULL,
	characterID INT UNIQUE NOT NULL,
	FOREIGN KEY (imageID) REFERENCES image(imageID) ON DELETE CASCADE,
	FOREIGN KEY (characterID) REFERENCES character(characterID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS character_in_image (
	imageID INT NOT NULL,
	characterID INT NOT NULL,
	FOREIGN KEY (imageID) REFERENCES image(imageID) ON DELETE CASCADE,
	FOREIGN KEY (characterID) REFERENCES character(characterID) ON DELETE CASCADE,
	UNIQUE (imageID, characterID)
);

CREATE TABLE IF NOT EXISTS character_relation (
	relationID INT GENERATED ALWAYS AS IDENTITY,
	characterID INT NOT NULL,
	targetID INT NOT NULL,
	relationship VARCHAR(100) NOT NULL,
	PRIMARY KEY (relationID),
	FOREIGN KEY (characterID) REFERENCES character(characterID) ON DELETE CASCADE,
	FOREIGN KEY (targetID) REFERENCES character(characterID) ON DELETE CASCADE
);

CREATE VIEW data AS
	SELECT character.characterID as id, character.name, dob, personality, appearance, background,
	gender.name as gender, gender.genderID as genderID, race.name as race, race.raceID as raceID, ethnicity, STRING_AGG(source.name,', ') as source,
	image.imageURL as profile FROM character
	LEFT OUTER JOIN gender ON gender.genderID = character.genderID
	LEFT OUTER JOIN race ON race.raceID = character.raceID
	LEFT OUTER JOIN character_source ON character_source.characterID = character.characterID
	LEFT OUTER JOIN source ON character_source.sourceID = source.sourceID
	LEFT OUTER JOIN character_profile_image ON character.characterID = character_profile_image.characterID
	LEFT OUTER JOIN image ON image.imageID = character_profile_image.imageID
	GROUP BY character.characterID, gender.name, gender.genderID, race.name, race.raceID, image.imageURL;

CREATE VIEW complete_data AS
	SELECT data.*, ARRAY_AGG(DISTINCT CONCAT(character.name, ' : ', character_relation.relationship)) as relationships FROM
	(SELECT data.*, ARRAY_AGG(DISTINCT image.imageURL) as images, ARRAY_AGG(DISTINCT character_dislike.name) as dislikes,
	ARRAY_AGG(DISTINCT character_like.name) as likes FROM data
	LEFT OUTER JOIN character_like ON character_like.characterID = data.id
	LEFT OUTER JOIN character_dislike ON character_dislike.characterID = data.id
	LEFT OUTER JOIN character_in_image ON character_in_image.characterID = data.id
	LEFT OUTER JOIN image ON image.imageID = character_in_image.imageID
	GROUP BY data.id, data.name, data.dob, data.personality, data.profile,
	data.appearance, data.background, data.gender, data.genderID, data.race, data.raceID, data.ethnicity, data.source) as data
	LEFT OUTER JOIN character_relation ON character_relation.characterID = data.id
	LEFT OUTER JOIN character ON character.characterID = character_relation.targetID
	GROUP BY data.id, data.name, data.dob, data.personality, data.profile,
	data.appearance, data.background, data.gender, data.genderID, data.race, data.raceID, data.ethnicity, data.source, data.images, data.likes, data.dislikes
	ORDER BY id ASC;