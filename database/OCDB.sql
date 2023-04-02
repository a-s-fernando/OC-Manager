DROP TABLE IF EXISTS character_source;
DROP TABLE IF EXISTS source;
DROP TABLE IF EXISTS character_dislikes;
DROP TABLE IF EXISTS character_likes;
DROP TABLE IF EXISTS thing;
DROP TABLE IF EXISTS character_profile_image;
DROP TABLE IF EXISTS character_in_image;
DROP TABLE IF EXISTS image;
DROP TABLE IF EXISTS character_relation;
DROP TABLE IF EXISTS character;

CREATE TABLE IF NOT EXISTS character (
	characterID INT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(100) NOT NULL,
	dob DATE,
	personality TEXT,
	appearance TEXT,
	background TEXT,
	gender VARCHAR(25),
	race VARCHAR(25),
	ethnicity VARCHAR(25),
	PRIMARY KEY (characterID)
);

CREATE TABLE IF NOT EXISTS source (
	sourceID INT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(100) UNIQUE NOT NULL,
	PRIMARY KEY (sourceID)
);

CREATE TABLE IF NOT EXISTS character_source (
	characterID INT NOT NULL,
	sourceID INT NOT NULL,
	FOREIGN KEY (characterID) REFERENCES character(characterID),
	FOREIGN KEY (sourceID) REFERENCES source(sourceID),
	UNIQUE (characterID, sourceID)
);

CREATE TABLE IF NOT EXISTS thing (
	thingID INT GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(100) UNIQUE NOT NULL,
	PRIMARY KEY (thingID)
);

CREATE TABLE IF NOT EXISTS character_likes (
	characterID INT NOT NULL,
	thingID INT NOT NULL,
	FOREIGN KEY (characterID) REFERENCES character(characterID),
	FOREIGN KEY (thingID) REFERENCES thing(thingID),
	UNIQUE (characterID, thingID)
);

CREATE TABLE IF NOT EXISTS character_dislikes (
	characterID INT NOT NULL,
	thingID INT NOT NULL,
	FOREIGN KEY (characterID) REFERENCES character(characterID),
	FOREIGN KEY (thingID) REFERENCES thing(thingID),
	UNIQUE (characterID, thingID)
);

CREATE TABLE IF NOT EXISTS image (
	imageID INT GENERATED ALWAYS AS IDENTITY,
	imageURL VARCHAR(500) UNIQUE NOT NULL,
	PRIMARY KEY (imageID)
);

CREATE TABLE IF NOT EXISTS character_profile_image (
	imageID INT NOT NULL,
	characterID INT UNIQUE NOT NULL,
	FOREIGN KEY (imageID) REFERENCES image(imageID),
	FOREIGN KEY (characterID) REFERENCES character(characterID)
);

CREATE TABLE IF NOT EXISTS character_in_image (
	imageID INT NOT NULL,
	characterID INT NOT NULL,
	FOREIGN KEY (imageID) REFERENCES image(imageID),
	FOREIGN KEY (characterID) REFERENCES character(characterID),
	UNIQUE (imageID, characterID)
);

CREATE TABLE IF NOT EXISTS character_relation (
	relationID INT GENERATED ALWAYS AS IDENTITY,
	characterID INT NOT NULL,
	targetID INT NOT NULL,
	relationship VARCHAR(100) NOT NULL,
	PRIMARY KEY (relationID),
	FOREIGN KEY (characterID) REFERENCES character(characterID),
	FOREIGN KEY (targetID) REFERENCES character(characterID)
);