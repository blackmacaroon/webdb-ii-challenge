const knex = require('knex');

const router = require('express').Router();
const Zoos = require('./zoos-model.js');

const config = {
      client: 'sqlite3',
      connection: {
            filename: './data/lambda.db3'
      },
      useNullAsDefault: true;
}

const db = knex(config);

