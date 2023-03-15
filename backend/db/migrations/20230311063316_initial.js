const tableNames = require('../../src/constants/tableNames');
const {
  addDefaultColumns,
  createTableHelper,
  references,
} = require('../../src/utils/tableDbUtils');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await Promise.all([
    knex.schema.createTable(tableNames.USER, (table) => {
      table.increments('user_id').notNullable();
      table.string('first_name').notNullable();
      table.string('mid_name');
      table.string('last_name');
      table.string('username', 50).unique().notNullable();
      table.string('password', 128).notNullable();
      references(table, tableNames.ROLE);
      addDefaultColumns(table);
    }),
    knex.schema.createTable(tableNames.FAMILY_CARD, (table) => {
      table.increments('family_card_id').notNullable();
      table.integer('family_card_number').notNullable().unique();
      addDefaultColumns(table);
    }),
    createTableHelper(
      knex,
      tableNames.DISABILITY,
      'disability_id',
      'disability_type'
    ),
    createTableHelper(
      knex,
      tableNames.OCCUPATION,
      'occupation_id',
      'occupation_type'
    ),
    createTableHelper(
      knex,
      tableNames.MARRIAGE,
      'marriage_id',
      'marriage_status'
    ),
    createTableHelper(knex, tableNames.ROLE, 'role_id', 'role_type'),
    createTableHelper(knex, tableNames.FAMREL, 'famrel_id', 'famrel_status'),
    createTableHelper(
      knex,
      tableNames.EDUCATION,
      'education_id',
      'education_type'
    ),
    createTableHelper(knex, tableNames.GENDER, 'gender_id', 'gender_type'),
    createTableHelper(
      knex,
      tableNames.RELIGION,
      'religion_id',
      'religion_name'
    ),
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await Promise.all(
    [
      tableNames.ROLE,
      tableNames.USER,
      tableNames.DISABILITY,
      tableNames.FAMILY_CARD,
      tableNames.OCCUPATION,
      tableNames.MARRIAGE,
      tableNames.FAMREL,
      tableNames.EDUCATION,
      tableNames.GENDER,
      tableNames.RELIGION,
    ]
      .map((tableName) => knex.schema.dropTable(tableName))
      .reverse()
  );
};
