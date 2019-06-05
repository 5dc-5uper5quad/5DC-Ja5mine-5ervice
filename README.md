# fec3-amkw-service

> Exhaust Purchase Options Module (Steam Game Page emulator)

## Related Projects

  - https://github.com/hair-punk/fec3-tvo-service
  - https://github.com/hair-punk/fec3-abhi-service
  - https://github.com/hair-punk/fec3-azu-service

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Installing Dependencies
From within the root directory:
> npm install

## Usage
> npm start
  - server listens on localhost:3003
> launch MongoDB server
  - app will create a db /purchaseoptionsservice
  > npm run seed-db

## Notes
- seed-db script inserts an array of 100 items into the database at once
- seed-db stores signed urls from AWS S3 buckets with max expiration of 7 days
- you will need access keys and permissions to access media content from AWS S3 buckets
- update index.jsx (line 196: where <App/> is rendered) to receive a gameid (Number between 1-100) as props instead of an empty string
- index.jsx uses variables gridContainer, col1, col2 to pad space to the left of the module so that the popover feature has an empty div to 'popover'. These are currently commented out.
- index.html file specifies a bgcolor tag, consider moving this to proxy for color consistency behind all modules

## Requirements
- Node 8.11.3
- Mongo shell 4.0.9
- Bundling with webpack + Babel7

## Development
Testing
- Mongoose MongoDB app: Mocha + chai.expect
- React: jest + enzyme
- GET uses '/games/:gameid' to add a new game document with purchase options 
- POST uses '/games' and adds a game purchase options to the database
- PUT uses '/games/:gameid' updates game purchase options by game_id for specifc game
- DELETE uses '/games/:gameid' to find a game_id and delete it, returns deleted game purchase options


