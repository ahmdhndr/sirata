const provinceService = require('./provinces.services');
const handleError = require('../../utils/handleError');

const provinceController = {
  postProvinceHandler: async (req, res, next) => {
    try {
      const createdProvince = await provinceService.addProvince(req.body);
      res.status(201).json({
        status: 'success',
        message: 'Data Provinsi berhasil dibuat',
        data: {
          createdProvince,
        },
      });
    } catch (error) {
      handleError(error, res, next);
    }
  },
  getProvincesHandler: async (req, res, next) => {
    try {
      const provinces = await provinceService.getProvinces();
      res.json({
        status: 'success',
        message: 'Berhasil mengambil data Provinsi',
        data: {
          provinces,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  getProvinceByIdHandler: async (req, res, next) => {
    const { id } = req.params;
    try {
      const province = await provinceService.getProvinceById(
        parseInt(id, 10) || 0
      );
      if (province) {
        return res.json({
          status: 'success',
          message: 'Berhasil mengambil data Provinsi',
          data: {
            province,
          },
        });
      }
      return next();
    } catch (error) {
      return handleError(error, res, next);
    }
  },
  putProvinceByIdHandler: async (req, res, next) => {
    const { id } = req.params;
    try {
      const updatedProvince = await provinceService.editProvinceById(
        id,
        req.body
      );
      return res.json({
        status: 'success',
        message: 'Data Provinsi berhasil diperbarui',
        data: {
          updatedProvince,
        },
      });
    } catch (error) {
      return handleError(error, res, next);
    }
  },
};

module.exports = provinceController;
