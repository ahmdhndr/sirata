const tableNames = require('../../src/constants/tableNames');
const {
  addDefaultColumns,
  references,
} = require('../../src/utils/tableDbUtils');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.USER_INFO, (table) => {
    table.increments('user_info_id').notNullable();
    table.integer('id_card').notNullable().unique();
    table.string('pob').notNullable();
    table.datetime('dob').notNullable();
    references(table, tableNames.USER);
    references(table, tableNames.GENDER);
    references(table, tableNames.ADDRESS);
    references(table, tableNames.RELIGION);
    references(table, tableNames.EDUCATION);
    references(table, tableNames.OCCUPATION);
    references(table, tableNames.MARRIAGE);
    references(table, tableNames.FAMREL);
    references(table, tableNames.FAMILY_CARD);
    references(table, tableNames.DISABILITY);
    addDefaultColumns(table);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.schema.dropTable(tableNames.USER_INFO);
};
