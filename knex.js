const knex = require('knex')

    const connect = knex({
    client: 'sqlite3', // or 'better-sqlite3'
    connection: {
      filename: "mydb.sqlite3"
    },
    useNullAsDefault: true,
});

module.exports = connect