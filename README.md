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
