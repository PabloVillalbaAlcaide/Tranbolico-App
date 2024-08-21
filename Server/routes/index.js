var express = require('express');
var router = express.Router();
const indexController = require ("../controllers/indexController")

router.get('/:type', indexController.searchProvinceOrCity);

module.exports = router;
