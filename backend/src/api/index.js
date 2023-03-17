const express = require('express');

const provinces = require('./provinces/provinces.routes');

const router = express.Router();
router.get('/', (req, res) => {
  res.json({
    message: 'API Sistem Informasi Rukun Tetangga',
  });
});
router.use('/provinces', provinces);

module.exports = router;
