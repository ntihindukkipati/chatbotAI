var express = require('express');
var router = express.Router();
var selInfos = require('../models/SelectedInfo.js');

/*ADDING SELECTED QUESTION SET AND PROFESSOR DETAILS*/
router.post('/', function (req, res, next) {
  console.log("in post of selectedInfo");
  console.log(req.body);
  selInfos.create(req.body, function (err, post) {
    console.log("posting selected question information");
    console.log(req.body);
    if (err) return next(err);
    res.json(post);
  });
});

/*GET ALL SELECTED INFOS*/
router.get('/', function (req, res, next) {
  console.log("all selected info");
  selInfos.distinct('selInfo', function (err, post) {
    console.log("getting...");
    if (err) return next(err);
    res.json(post);
  });
});
module.exports = router;
