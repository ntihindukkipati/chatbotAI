var express = require('express');
var router = express.Router();
var professor = require('../models/Professor.js');

/* SAVE PROFESSOR */
router.post('/', function (req, res, next) {
  professor.create(req.body, function (err, post) {
    console.log("post");
    console.log(req.body);
    if (err) return next(err);
    res.json(post);
  });
});
/*GET PROFESSOR*/
router.get('/:profName', function (req, res, next) {
  console.log("profName",req.params.profName);
  professor.findOne( {'a_prof': req.params.profName}, function (err, post) {
    console.log("post");
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE PROFESSOR */
router.put('/:profName', function(req, res, next){
  console.log("profName",req.params.profName);
  console.log(req.body);
  professor.findOneAndUpdate({'a_prof': req.params.profName}, {$set : req.body}, {new: true}, function (err,post){
    console.log("in update")
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE PROFESSOR */
router.delete('/:profName', function(req, res, next){
  professor.findOneAndDelete({'a_prof': req.params.profName}, function (err,post){
    if (err) return next(err);
    res.json(post);
  });
});

/*GET ALL PROFESSOR NAMES*/
router.get('/', function (req, res, next) {
  console.log("all professor names");
  professor.distinct('a_prof', function (err, post) {
    console.log("getting...");
    if (err) return next(err);
    res.json(post);
  });
});
module.exports = router;
