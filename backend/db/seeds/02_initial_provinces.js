const tableNames = require('../../src/constants/tableNames');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex(tableNames.PROVINCE).insert([
    { province_id: 1, province_name: 'DKI Jakarta' },
    { province_id: 2, province_name: 'Banten' },
    { province_id: 3, province_name: 'Jawa Barat' },
    { province_id: 4, province_name: 'Jawa Tengah' },
    { province_id: 5, province_name: 'Jawa Timur' },
    { province_id: 6, province_name: 'D.I. Yogyakarta' },
  ]);
};
