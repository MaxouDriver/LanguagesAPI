var express = require('express');
var router = express.Router();
var db = require('../utils/database.js');

router.get('/', function(req, res, next) {
  res.send('all examples');
});

router.get('/:id', function(req, res, next) {
  res.send('specific example');
});

router.post('/', function(req, res, next) {
  res.send('new example');
});

router.put('/:id', function(req, res, next) {
  res.send('modified example');
});

router.delete('/:id', function(req, res, next) {
  res.send('delete example');
});

module.exports = router;
