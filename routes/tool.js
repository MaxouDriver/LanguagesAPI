var express = require('express');
var router = express.Router();
var db = require('../utils/database.js');

router.get('/', function(req, res, next) {
  res.send('all tools');
});

router.get('/:id', function(req, res, next) {
  res.send('specific tool');
});

router.post('/', function(req, res, next) {
  res.send('new tool');
});

router.put('/:id', function(req, res, next) {
  res.send('modified tool');
});

router.delete('/:id', function(req, res, next) {
  res.send('delete tool');
});

module.exports = router;
