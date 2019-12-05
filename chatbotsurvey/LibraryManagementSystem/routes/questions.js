var express = require('express');
var router = express.Router();
var question = require('../models/Questions.js');



/*GET QUESTION*/
router.get('/:quesName', function (req, res, next) {
  console.log("quesName",req.params.quesName);
  question.findOne( {'qSet': req.params.quesName}, function (err, post) {
    console.log("post");
    if (err) return next(err);
    res.json(post);
  });
});


module.exports = router;
