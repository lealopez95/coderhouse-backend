const knex = require('knex');
const dbConfigs = require('../db/config.js');


class Container {
    connection;
    tableName;

    constructor(tableName) {
        this.tableName = tableName;
        if(tableName==='products') {
            this.connection = knex({...dbConfigs.mariaDB});
        } else {
            this.connection = knex({...dbConfigs.sqlite3});
        }
    }

    async getAll() {
        try {
            return this.connection.select().from(this.tableName);
        } catch(e) {
            console.log("Something went wrong on getAll", e)
        }
    }

    async save(product) {
        try {
            if(product?.id) {
                const { id, name, description, price, image } = product;
                await this.connection(this.tableName)
                    .where({ id })
                    .update({
                        name,
                        description,
                        price,
                        image,
                    });
            } else {
                await this.connection(this.tableName).insert(
                    product
                );
            }
        } catch(e) {
            console.log("Something went wrong on save", e)
        }
    }

    async getById(id) {
        try {
            return this.connection
                .from(this.tableName)
                .select('*')
                .where({ id });
        } catch(e) {
            console.log("Something went wrong on getById", e)
        }
    }

    

    async deleteById(id) {
        try {
            await this.connection(this.tableName)
                .where({ id })
                .del();
        } catch(e) {
            console.log("Something went wrong on delete", e)
        }
    }

    async deleteAll() {
        try {
            await this.connection(this.tableName)
                .where('id', '>', 0)
                .del();
        } catch(e) {
            console.log("Something went wrong on deleteAll", e)
        }
    }
}

module.exports = Container;