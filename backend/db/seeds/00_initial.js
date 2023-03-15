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

  await knex(tableNames.DISABILITY).insert([
    { disability_type: 'Tidak Ada' },
    { disability_type: 'Fisik' },
    { disability_type: 'Mental' },
    { disability_type: 'Intelektual' },
    { disability_type: 'Sensorik Wicara' },
    { disability_type: 'Sensorik Rungu' },
    { disability_type: 'Sensorik Netra' },
  ]);
  await knex(tableNames.OCCUPATION).insert([
    { occupation_type: 'Belum / Tidak Bekerja' },
    { occupation_type: 'Pelajar / Mahasiswa' },
    { occupation_type: 'Pensiunan' },
    { occupation_type: 'Tentara Nasional Indonesia' },
    { occupation_type: 'Petani / Pekebun' },
    { occupation_type: 'Nelayan / Perikanan' },
    { occupation_type: 'Pendeta' },
    { occupation_type: 'Wakil Gubernur' },
    { occupation_type: 'Bupati' },
    { occupation_type: 'Guru' },
    { occupation_type: 'Perawat' },
    { occupation_type: 'Wiraswasta' },
    { occupation_type: 'Lainnya' },
  ]);
  await knex(tableNames.MARRIAGE).insert([
    { marriage_status: 'Belum Kawin' },
    { marriage_status: 'Kawin Belum Tercatat' },
    { marriage_status: 'Kawin Tercatat' },
    { marriage_status: 'Cerai Hidup' },
    { marriage_status: 'Cerai Mati' },
  ]);
  await knex(tableNames.EDUCATION).insert([
    { education_type: 'Tidak / Belum Sekolah' },
    { education_type: 'Belum Tamat SD / Sederajat' },
    { education_type: 'Tamat SD / Sederajat' },
    { education_type: 'SLTP / Sederajat' },
    { education_type: 'SLTA / Sederajat' },
    { education_type: 'Diploma I / II' },
    { education_type: 'Akademi / Diploma III / S. Muda' },
    { education_type: 'Diploma IV / Strata I' },
    { education_type: 'Strata II' },
    { education_type: 'Strata III' },
  ]);
  await knex(tableNames.RELIGION).insert([
    { religion_name: 'Islam' },
    { religion_name: 'Kristen (Protestan)' },
    { religion_name: 'Katholik' },
    { religion_name: 'Hindu' },
    { religion_name: 'Budha' },
    { religion_name: 'Konghucu' },
  ]);
  await knex(tableNames.FAMREL).insert([
    { famrel_status: 'Kepala Keluarga' },
    { famrel_status: 'Suami' },
    { famrel_status: 'Istri' },
    { famrel_status: 'Anak' },
    { famrel_status: 'Menantu' },
    { famrel_status: 'Cucu' },
    { famrel_status: 'Orang Tua' },
    { famrel_status: 'Mertua' },
    { famrel_status: 'Famili Lain' },
    { famrel_status: 'Pembantu' },
    { famrel_status: 'Lainnya' },
  ]);
  await knex(tableNames.GENDER).insert([
    { gender_type: 'Laki-laki' },
    { gender_type: 'Perempuan' },
  ]);
  await knex(tableNames.ROLE).insert([
    { role_type: 'superuser' },
    { role_type: 'admin' },
    { role_type: 'member' },
  ]);
  await knex(tableNames.PROVINCE).insert([{ province_name: 'Jawa Barat' }]);
};
