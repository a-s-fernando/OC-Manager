# OC-Manager

A toy/personal project for helping my partner store and access information on her original characters. The API can facilitate storage of:

- Character descriptions
- Relationships
- Images

...and ~~not~~ much more!

## To Install

`npm install -D`

## Setting up the Database

This API relies on a Postgres database to function. There is currently not a provided function to set up the database for you, however a **.sql** file is provided in the database folder that you can use to set it up yourself.

An entity relationship diagram of the provided OCDB.sql file can be found [here](https://ibb.co/z58NQkr).

The following variables are expected in a **.env** file located in the root folder:

```
PGHOST
PGUSER
PGDATABASE
PGPASSWORD
PGPORT
```

## To Run

`npm start`

The API runs on port 3000, unless changed manually in **index.js**

## Routes

Routes, methods and what data they require provided through a JSON.

| Method | Route                         | JSON                                                                                                                         | Description                                                          |
| ------ | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| GET    | /source                       | N/A                                                                                                                          | Get all sources                                                      |
| DELETE | /source                       | id int                                                                                                                       | Delete a specific source                                             |
| POST   | /source                       | name str                                                                                                                     | Add a new source                                                     |
| PUT    | /source                       | id int, name str                                                                                                             | Update a specific source                                             |
| GET    | /race                         | N/A                                                                                                                          | Get all races                                                        |
| DELETE | /race                         | id int                                                                                                                       | Delete a specific race                                               |
| POST   | /race                         | name str                                                                                                                     | Add a new race                                                       |
| PUT    | /race                         | id int, name str                                                                                                             | Update a specific race                                               |
| GET    | /image                        | N/A                                                                                                                          | Get all images                                                       |
| DELETE | /image                        | id int                                                                                                                       | Delete a specific image                                              |
| POST   | /image                        | imageURL str                                                                                                                 | Add a new image                                                      |
| PUT    | /image                        | id int, imageURL str                                                                                                         | Update an image                                                      |
| GET    | /gender                       | N/A                                                                                                                          | Get all genders                                                      |
| DELETE | /gender                       | id int                                                                                                                       | Delete a specific gender                                             |
| POST   | /gender                       | name str                                                                                                                     | Create a new gender                                                  |
| PUT    | /gender                       | id int, name str                                                                                                             | Update a gender                                                      |
| GET    | /character                    | N/A                                                                                                                          | Get all characters                                                   |
| GET    | /character/:id                | N/A                                                                                                                          | Get a specific character                                             |
| GET    | /character/:id/relations      | N/A                                                                                                                          | Get the relationships of a specific character                        |
| GET    | /character/:id/likes          | N/A                                                                                                                          | Get all likes of a character                                         |
| GET    | /character/:id/dislikes       | N/A                                                                                                                          | Get all dislikes of a character                                      |
| GET    | /character/:id/profile_image  | N/A                                                                                                                          | Get the profile image of a character                                 |
| GET    | /character/:id/images         | N/A                                                                                                                          | Get all images containing a character                                |
| DELETE | /character                    | id int                                                                                                                       | Delete a specific character                                          |
| DELETE | /character/relations          | id int                                                                                                                       | Delete a specific character relation                                 |
| DELETE | /character/profile_image      | characterID int                                                                                                              | Delete a particular profile image                                    |
| DELETE | /character/character_in_image | imageID int, characterID int                                                                                                 | Delete a character from a particular image                           |
| DELETE | /character/like               | id int, name str                                                                                                             | Delete a particular like from a character                            |
| DELETE | /character/dislike            | id int, name str                                                                                                             | Delete a particular dislike from a character                         |
| POST   | /character                    | name str, dob "YYYY/MM/DD", personality str, appearance str, background str, genderID int, raceID int, ethnicity str         | Create a new character                                               |
| POST   | /character/profile_image      | imageID int, characterID int                                                                                                 | Link a new image to a character as a profile image                   |
| POST   | /character/character_in_image | imageID int characterID int                                                                                                  | Link a new image to a character                                      |
| POST   | /character/source             | characterID int, sourceID int                                                                                                | Link a new source to a character                                     |
| POST   | /character/relation           | characterID int, targetID int, relationship str                                                                              | Define a new relationship between the character and target character |
| POST   | /character/dislike            | characterID int, name str                                                                                                    | Create a new dislike for a character                                 |
| POST   | /character/like               | characterID int, name str                                                                                                    | Create a new like for a character                                    |
| PUT    | /character                    | id int, name str, dob "YYYY/MM/DD", personality str, appearance str, background str, genderID int, raceID int, ethnicity str | Update a character                                                   |
| PUT    | /character/relation           | id int, relationship str                                                                                                     | Update a relation                                                    |
