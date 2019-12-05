var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');


var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://nikhitha:niki2312@cluster0-9q5qj.mongodb.net/AIChatBot?retryWrites=true&w=majority')
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));

var apiRouter = require('./routes/registration');
var gapiRouter = require('./routes/globalOrg');
var papiRouter = require('./routes/professor');
var quesRouter = require('./routes/questions');
var selInfosRouter = require('./routes/selectedInfo');
var userDataRouter = require('./routes/userdata');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'dist/project3')));
app.use('/register', express.static(path.join(__dirname, 'dist/project3')));
app.use('/login', express.static(path.join(__dirname, 'dist/project3')));
app.use('/g-dashboard', express.static(path.join(__dirname, 'dist/project3')));
app.use('/l-dashboard', express.static(path.join(__dirname, 'dist/project3')));
app.use('/prof-dashboard', express.static(path.join(__dirname, 'dist/project3')));
app.use('/api', apiRouter);
app.use('/gapi', gapiRouter);
app.use('/papi', papiRouter);
app.use('/qapi', quesRouter);
app.use('/sapi', selInfosRouter);
app.use('/uapi', userDataRouter);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
/*app.use(express.json());
app.use(express.urlencoded({ extended: false }));*/
//app.use(express.multipart());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});

module.exports = app;
