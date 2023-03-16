const orderedTableNames = require('../../src/constants/orderedTableNames');
const tableNames = require('../../src/constants/tableNames');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await orderedTableNames.reduce(async (promise, tableName) => {
    await promise;
    console.log('Clearing ', tableName);

    return knex(tableName).del();
  }, Promise.resolve());

  await knex(tableNames.ROLE).insert([
    { role_id: 1, role_type: 'superuser' },
    { role_id: 2, role_type: 'admin' },
    { role_id: 3, role_type: 'member' },
  ]);
};
