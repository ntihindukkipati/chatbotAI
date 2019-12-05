var express = require('express');
var router = express.Router();
var question = require('../models/Questions.js');
var nodemailer = require('nodemailer');


/*GET QUESTION*/
router.get('/:quesName', function (req, res, next) {
  console.log("quesName",req.params.quesName);
  question.findOne( {'qSet': req.params.quesName}, function (err, post) {
    console.log("post");
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE QUESTION */
router.put('/:quesName', function(req, res, next){
  console.log("quesName",req.params.quesName);
  console.log(req.body);
  question.findOneAndUpdate({'qSet': req.params.quesName}, {$set : req.body}, {new: true}, function (err,post){
    console.log("in update")
    if (err) return next(err);
    res.json(post);
  });
});

/*ADDING SELECTED QUESTION SET AND PROFESSOR DETAILS*/

/*MAILER*/
var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "forprojectd2n@gmail.com",
    pass: "d2n51220"
  }
});

router.post('/:emailIds', function (req, res, next) {
  var mailOptions = {
    to: req.params.emailIds,
    subject: "Please fill the survey.",
    text: 'Please fill the Survey. Click here. https://aichatbotsurvey.herokuapp.com/books'
  }



  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      res.json({error: "API Error"});
    } else {
      console.log("Message sent: " + response.message);
      res.json({ response: "sent" });
    }
  });
});

/*GET ALL QUESTIONS*/
router.get('/', function (req, res, next) {
  question.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

module.exports = router;
