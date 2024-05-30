var express = require('express');
var router = express.Router();
var adminRoutes = require('./admin/index')

/* GET home page. */
router.use('/admin', adminRoutes)

module.exports = router;
