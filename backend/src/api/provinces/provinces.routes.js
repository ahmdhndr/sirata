const express = require('express');

const provinceController = require('./provinces.controllers');

const router = express.Router();

router.post('/', provinceController.postProvinceHandler);
router.get('/', provinceController.getProvincesHandler);
router.get('/:id', provinceController.getProvinceByIdHandler);
router.put('/:id', provinceController.putProvinceByIdHandler);

module.exports = router;
