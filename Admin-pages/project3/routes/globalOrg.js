var express = require('express');
var router = express.Router();
var globalOrg = require('../models/GlobalOrg.js');


/*GET GLOBAL ORGANISATION*/
router.get('/:orgName', function (req, res, next) {
  console.log("orgName",req.params.orgName);
  globalOrg.findOne( {'g_orgName': req.params.orgName}, function (err, post) {
    console.log("get");
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE GLOBAL ORGANISATION */
router.put('/:orgName', function(req, res, next){
  console.log("orgName",req.params.orgName);
  console.log(req.body);
  globalOrg.findOneAndUpdate({'g_orgName': req.params.orgName}, {$set : req.body}, {new: true}, function (err,post){
    console.log("in update")
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE GLOBAL ORGANISATION */
router.delete('/:orgName', function(req, res, next){
  globalOrg.findOneAndDelete({'g_orgName': req.params.orgName}, function (err,post){
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE GLOBAL ORGANISATION */
router.post('/', function (req, res, next) {
  globalOrg.create(req.body, function (err, post) {
    console.log("post");
    console.log(req.body);
    if (err) return next(err);
    res.json(post);
  });
});

/*GET ALL ORGANIZATION NAMES*/
router.get('/', function (req, res, next) {
  console.log("all organisation names");
  globalOrg.distinct('g_orgName', function (err, post) {
    console.log("getting...");
    if (err) return next(err);
    res.json(post);
  });
});
module.exports = router;
