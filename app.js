const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs')

const indexRouter = require('./routes/index');
const typoRouter = require('./routes/typo');
const languageRouter = require('./routes/language');
const tagRouter = require('./routes/tag');
const toolRouter = require('./routes/tool');
const exampleRouter = require('./routes/example');

const db = require('./utils/database.js');

const app = express();

const secret = "318tim42b18power";

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

function isAuthenticated(req, res, next) {
  if (req.headers.authorization !== undefined) {
      // retrieve the authorization header and parse out the
      // JWT using the split function
      let token = req.headers.authorization;
      
      // Here we validate that the JSON Web Token is valid and has been 
      // created using the same private pass phrase
      jwt.verify(token, secret, { algorithm: "HS256" }, (err, user) => {
          
          // if there has been an error...
          if (err) {  
              // shut them out!
              return res.status(401).json({ error: "Not Authorized" });
          }
          // if the JWT is valid, allow them to hit
          // the intended endpoint
          return next();
      });
  } else {
      // No authorization header exists on the incoming
      // request, return not authorized and throw a new error 
      return res.status(401).json({ error: "Not Authorized" });
  }
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.get('/jwt', (req, res) => {
    let token = jwt.sign({ check: true }, secret, { algorithm: 'HS256'});
    res.send(token);
})
app.use('/api/v1/language',isAuthenticated, languageRouter);
app.use('/api/v1/typo',isAuthenticated, typoRouter);
app.use('/api/v1//tag',isAuthenticated, tagRouter);
app.use('/api/v1/tool',isAuthenticated, toolRouter);
app.use('/api/v1/example',isAuthenticated, exampleRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({error: true, message: err.status});
});

module.exports = app;
