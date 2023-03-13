/* eslint-disable no-unused-vars */
const Knex = require('knex');

const tableNames = require('../../src/constants/tableNames');

function addDefaultColumns(table) {
  table.timestamps(false, true);
}

function createNamesTable(knex, tables, colId, colString) {
  return knex.schema.createTable(tables, (table) => {
    table.increments(colId).notNullable();
    table.string(colString).notNullable();
    addDefaultColumns(table);
  });
}

function references(table, tableName) {
  table
    .integer(`${tableName}_id`)
    .unsigned()
    .references(`${tableName}_id`)
    .inTable(tableName)
    .onDelete('cascade');
}

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await Promise.all([
    knex.schema.createTable(tableNames.USER, (table) => {
      table.increments('user_id').notNullable();
      table.string('first_name').notNullable();
      table.string('mid_name');
      table.string('last_name');
      table.integer('phone');
      table.string('password', 128).notNullable();
      addDefaultColumns(table);
    }),
    knex.schema.createTable(tableNames.FAMILY_CARD, (table) => {
      table.increments('famcard_id').notNullable();
      table.integer('famcard_number').notNullable().unique();
      addDefaultColumns(table);
    }),
    createNamesTable(
      knex,
      tableNames.DISABILITY,
      'disability_id',
      'disability_type'
    ),
    createNamesTable(
      knex,
      tableNames.OCCUPATION,
      'occupation_id',
      'occupation_type'
    ),
    createNamesTable(
      knex,
      tableNames.MARRIAGE,
      'marriage_id',
      'marriage_status'
    ),
    createNamesTable(knex, tableNames.ROLE, 'role_id', 'role_status'),
    createNamesTable(knex, tableNames.FAMREL, 'famrel_id', 'famrel_status'),
    createNamesTable(
      knex,
      tableNames.EDUCATION,
      'education_id',
      'education_type'
    ),
    createNamesTable(knex, tableNames.GENDER, 'gender_id', 'gender_type'),
    createNamesTable(knex, tableNames.RELIGION, 'religion_id', 'religion_name'),
    createNamesTable(knex, tableNames.COUNTRY, 'country_id', 'country_name'),
  ]);

  await knex.schema.createTable(tableNames.PROVINCE, (table) => {
    table.increments('province_id').notNullable();
    table.string('province_name').notNullable();
    references(table, 'country');
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.CIREG, (table) => {
    table.increments('cireg_id').notNullable();
    table.string('cireg_type').notNullable();
    table.string('cireg_name').notNullable();
    references(table, 'province');
    addDefaultColumns(table);
  });
};

exports.down = async (knex) => {
  await Promise.all(
    [
      tableNames.USER,
      tableNames.DISABILITY,
      tableNames.FAMILY_CARD,
      tableNames.OCCUPATION,
      tableNames.MARRIAGE,
      tableNames.ROLE,
      tableNames.FAMREL,
      tableNames.EDUCATION,
      tableNames.GENDER,
      tableNames.RELIGION,
      tableNames.COUNTRY,
      tableNames.PROVINCE,
      tableNames.CIREG,
    ]
      .map((tableName) => knex.schema.dropTable(tableName))
      .reverse()
  );
};
