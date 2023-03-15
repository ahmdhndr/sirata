const tableNames = require('../../src/constants/tableNames');
const {
  addDefaultColumns,
  references,
  createTableHelper,
} = require('../../src/utils/tableDbUtils');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await createTableHelper(
    knex,
    tableNames.PROVINCE,
    'province_id',
    'province_name'
  );

  await createTableHelper(
    knex,
    tableNames.CIREG,
    'cireg_id',
    'cireg_name',
    tableNames.PROVINCE,
    true
  );

  await createTableHelper(
    knex,
    tableNames.DISTRICT,
    'district_id',
    'district_name',
    tableNames.CIREG,
    true
  );

  await knex.schema.createTable(tableNames.VILLARD, (table) => {
    table.increments('villard_id').notNullable();
    table.string('villard_type').notNullable();
    table.string('villard_name').notNullable();
    references(table, tableNames.DISTRICT);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.POSTCODE, (table) => {
    table.increments('postcode_id').notNullable();
    table.integer('postcode_number').notNullable();
    references(table, tableNames.DISTRICT);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.RW, (table) => {
    table.increments('rw_id').notNullable();
    table.integer('rw_number').notNullable();
    references(table, tableNames.VILLARD);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.RT, (table) => {
    table.increments('rt_id').notNullable();
    table.integer('rt_number').notNullable();
    references(table, tableNames.RW);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.ADDRESS, (table) => {
    table.increments('address_id').notNullable();
    table.integer('address_line').notNullable();
    references(table, tableNames.RT);
    references(table, tableNames.RW);
    references(table, tableNames.POSTCODE);
    references(table, tableNames.VILLARD);
    references(table, tableNames.DISTRICT);
    references(table, tableNames.CIREG);
    references(table, tableNames.PROVINCE);
    addDefaultColumns(table);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await Promise.all(
    [
      tableNames.PROVINCE,
      tableNames.CIREG,
      tableNames.DISTRICT,
      tableNames.VILLARD,
      tableNames.POSTCODE,
      tableNames.RW,
      tableNames.RT,
      tableNames.ADDRESS,
    ]
      .map((tableName) => knex.schema.dropTable(tableName))
      .reverse()
  );
};
