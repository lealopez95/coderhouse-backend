/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports.up = async function(knex) {
    const exists = await knex.schema.hasTable('products');
    if(!exists) {
        return knex.schema.createTable('products', (table) => {
            table.increments('id');
            table.string('name');
            table.string('description');
            table.float('price');
            table.string('image');
        });
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports.down = async function(knex) {
    return knex.schema.dropTableIfExists('products');
};
