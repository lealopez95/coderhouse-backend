const { mariaDB, sqlite3 } = require('./db/config.js');

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
 module.exports = {
  development: {
    ...mariaDB,
    migrations: {
      directory: './db/migrations'
    }
  }
};
//  module.exports = {
//   development: {
//     ...sqlite3,
//     migrations: {
//       directory: './db/sqlite3/migrations'
//     }
//   }
// };

