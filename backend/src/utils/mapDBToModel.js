/* eslint-disable camelcase */

const mapDBToModel = ({
  province_id,
  province_name,
  created_at,
  updated_at,
}) => ({
  provinceId: province_id,
  provinceName: province_name,
  createdAt: created_at,
  updatedAt: updated_at,
});

module.exports = mapDBToModel;
