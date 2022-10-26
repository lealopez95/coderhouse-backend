const path = require('path');

module.exports = {
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: path.resolve(__dirname, '../db.sqlite')
        },
        useNullAsDefault: true
    },
    mariaDB: {
        client: 'mysql',
        connection: {
            host : '127.0.0.1',
            port : 3306,
            user : 'root',
            database : 'mysql_challenge'
        }
    }
}