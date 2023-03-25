const db = require('../../db');

const tableNames = require('../../constants/tableNames');
const mapDBToModel = require('../../utils/mapDBToModel');
const InvariantError = require('../../exceptions/InvariantError');
const isEmpty = require('../../utils/isEmptyValidator');
const NotFoundError = require('../../exceptions/NotFoundError');

const fields = ['province_id', 'province_name'];

const provinceService = {
  async addProvince(payload) {
    if (
      isEmpty(payload.province_name) ||
      typeof payload.province_name !== 'string'
    )
      throw new InvariantError(
        'Tidak dapat membuat data Provinsi. Data tidak ada/tidak valid!'
      );
    const result = await db(tableNames.PROVINCE).insert(payload).returning('*');
    return result.map(mapDBToModel)[0];
  },
  async getProvinces() {
    const result = await db(tableNames.PROVINCE).select(fields);
    return result.map(mapDBToModel);
  },
  async getProvinceById(id) {
    const result = await db(tableNames.PROVINCE)
      .select('*')
      .where(db.raw('?? = ?', ['province_id', id]));
    if (!result.length)
      throw new NotFoundError('Data Provinsi tidak ditemukan!');
    return result.map(mapDBToModel)[0];
  },
  async editProvinceById(id, payload) {
    if (
      isEmpty(payload.province_name) ||
      typeof payload.province_name !== 'string'
    )
      throw new InvariantError(
        'Tidak dapat merubah data Provinsi. Data tidak ada/tidak valid!'
      );
    const updatedAt = new Date().toISOString();
    const result = await db(tableNames.PROVINCE)
      .where('province_id', id)
      .update({ province_name: payload.province_name, updated_at: updatedAt }, [
        'province_id',
        'province_name',
        'updated_at',
      ])
      .returning(fields);
    if (!result.length)
      throw new NotFoundError('Data Provinsi tidak ditemukan!');
    return result.map(mapDBToModel)[0];
  },
};

module.exports = provinceService;
