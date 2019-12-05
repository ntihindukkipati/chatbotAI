var express = require('express');
var router = express.Router();
var AllUsers = require('../models/Registration.js');

/* SAVE ALLUSERS REGISTRATION DETAILS */
router.post('/', function (req, res, next) {
  AllUsers.create(req.body, function (err, post) {
    console.log("check");
    console.log(req.body);
    if (err) return next(err);
    res.json(post);
  });
});

/*GET LOGIN DETAILS*/
router.get('/:loginName', function (req, res, next) {
  console.log('request',req.params);
  console.log("loginName",req.params.loginName);
  AllUsers.findOne( {'login_username': req.params.loginName}, function (err, post) {
    console.log("get");
    if (err) return next(err);
    res.json(post);
  });
});
module.exports = router;
