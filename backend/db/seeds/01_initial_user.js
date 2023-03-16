const crypto = require('crypto');
const bcrypt = require('bcrypt');

const tableNames = require('../../src/constants/tableNames');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  const password = crypto.randomBytes(15).toString('hex');

  const initialUser = {
    user_id: 1,
    first_name: 'Achmad',
    last_name: 'Hendarsyah',
    username: 'erudev',
    password: await bcrypt.hash(password, 12),
    role_id: 1,
  };

  const createdUser = await knex(tableNames.USER)
    .insert(initialUser)
    .returning('*');
  console.log(createdUser);

  console.log(
    'User created: ',
    {
      password,
    },
    createdUser[0]
  );
};
