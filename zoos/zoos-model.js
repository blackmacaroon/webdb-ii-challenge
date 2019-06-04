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
      findById,
      add,
      update,
      remove
};

function find() {
      return db('zoos');
}

function findById(id) {
      return db('zoos')
      .where({ id })
      .first();
}

async function add(zoo) {
      const [id] = await db('zoos').insert(zoo);
      return findById(id)
}

function update(id, changes) {
      return db('zoos')
      .where({ id })
      .update(changes, "*");
}

function remove(id) {
      return db('zoos')
      .where({ id })
      .del();
}