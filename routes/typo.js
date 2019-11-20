var express = require('express');
var router = express.Router();
var db = require('../utils/database.js');

router.get('/', function(req, res, next) {
  res.send('all typos');
});

router.get('/:id', function(req, res, next) {
  res.send('specific typo');
});

router.post('/', function(req, res, next) {
  res.send('new typo');
});

router.put('/:id', function(req, res, next) {
  res.send('modified typo');
});

router.delete('/:id', function(req, res, next) {
  res.send('delete typo');
});

module.exports = router;
