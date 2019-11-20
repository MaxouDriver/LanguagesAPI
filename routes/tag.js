var express = require('express');
var router = express.Router();
var db = require('../utils/database.js');

router.get('/', function(req, res, next) {
  res.send('all tags');
});

router.get('/:id', function(req, res, next) {
  res.send('specific tag');
});

router.post('/', function(req, res, next) {
  res.send('new tag');
});

router.put('/:id', function(req, res, next) {
  res.send('modified tag');
});

router.delete('/:id', function(req, res, next) {
  res.send('delete tag');
});

module.exports = router;
