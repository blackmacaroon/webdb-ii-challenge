const knex = require('knex');

const config = {
      client: 'sqlite3',
      connection: {
        filename: './data/lambda.db3'
      },
      //this is only required for sqlite
      useNullAsDefault: true,
      //this will give you the SQL commad in the terminal 
      // debug: true,
}
const db = knex(config);

module.exports = {
      find,
      finById,
      add,
      update,
      remove
};

function find() {
      return db('zoos');
}

function finById(id) {
      return db('zoos').where({ id })
      .first();
}

function add(zoo) {
      return null
}

function update(id, change) {
      return null
}

function remove(id) {
      return null
}