const tableNames = require("../src/constants/tableNames");
const db = require("../src/db");

const ProvinceTableTestHelper = {
  async addProvince({ id = 1, name = "test" }) {
    /**
     * @param { import("knex").Knex } knex
     */
    const [province] = await db(tableNames.PROVINCE)
      .insert({ province_id: id, province_name: name })
      .returning("*");
    return province;
  },

  async cleanTable() {
    await db(tableNames.PROVINCE).del();
  },
};

module.exports = ProvinceTableTestHelper;
