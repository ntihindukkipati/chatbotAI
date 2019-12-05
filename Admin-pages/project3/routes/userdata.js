var express = require('express');
var router = express.Router();
var userData = require('../models/Userdatas.js');

/*GET ALL QUESTIONS*/
router.get('/', function (req, res, next) {
  userData.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

module.exports = router;
