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
      return db('bears');
}

function findById(id) {
      return db('bears')
      .where({ id })
      .first();
}

async function add(bear) {
      const [id] = await db('bears').insert(bear);
      return finById(id)
}

function update(id, changes) {
      return db('bears')
      .where({ id })
      .update(changes, "*");
}

function remove(id) {
      return db('bears')
      .where({ id })
      .del();
}