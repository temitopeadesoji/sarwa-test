# Sarwa test - api

### Overview

This app is built for a NodeJS backend with a Postgres database

### Installation

- Install [node.js](https://nodejs.org) if don't have it on your machine already.
- Create a `.env` file in the root directory of this project and populate it with the required values. See `.sample.env` file for more info.
- Setup a Postgres database, see section below.

#### Postgres DB

You can install PostgresDB locally [Official doc](https://www.postgresql.org/).

### Quick start

#### Frontend - React App (NextJS)

- In the `frontend` directory, run the following commands
  - Run `npm install`
  - Run `npm run dev` to start the next dev server (which will apply any new changes to the react code)

If you run into any issues with installation, check `src/react-app/readme.md` which provides more details about the react app installation.

#### Backend - Node JS

- In the root directory, run the following commands
  - Run `npm install` to install the required packages for the server
  - Run `npm run migrate` to seed the database (do this only once)
  - Run `npm run start:dev` to start your backend server

### Assignment

This assignment is about creating a simple dashboard that staff can use to manage client accounts.
Client accounts are simplified here to have the following fields

- Status
- Balance

Account statuses have the following values and meanings:

- Pending: An account that has been created but not yet approved by our team. Basically
  the client finished the “setup” but now we need to review their info before they can
  trade/fund. All accounts start off in this state. Can become approved or closed.
- Approved: An account that has been approved by our team. Can become funded or
  closed.
- Funded: An approved account that has been funded. Can become closed but only if the
  balance is 0.
- Closed: Final state of an account. Basically it’s no-longer usable.
