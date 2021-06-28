# Sarwa test - api

### Overview

This app is built for a NodeJS backend with a Postgres database

### Installation

- Install [node.js](https://nodejs.org) if don't have it on your machine already.
- Install [postgres](https://www.postgresql.org/) if don't have it on your machine already.
- Create a `.env` file in the root directory of this project and populate it with the required values. See `.sample.env` file for more info.
- Setup a Postgres database, see section below.

#### Postgres DB

You can install PostgresDB locally [Official doc](https://www.postgresql.org/).

### Quick start

- Run `npm install` to install the required packages for the server
- Run `npm run migrate` to seed the database (do this only once)
- Run `npm run start:def` to start your backend server
