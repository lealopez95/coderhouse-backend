/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 module.exports.up = async function(knex) {
    const exists = await knex.schema.hasTable('messages');
    if(!exists) {
        return knex.schema.createTable('messages', (table) => {
            table.increments('id');
            table.string('email');
            table.string('message');
            table.timestamp('timestamp');
        });
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 module.exports.down = async function(knex) {
    return knex.schema.dropTableIfExists('messages');
};
