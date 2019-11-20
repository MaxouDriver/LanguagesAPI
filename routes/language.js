var express = require('express');
var router = express.Router();
var db = require('../utils/database.js');

router.get('/', function(req, res, next) {
  res.send('all languages');
});

router.get('/:id', function(req, res, next) {
  res.send('specific language');
});

router.post('/', function(req, res, next) {
  res.send('new language');
});

router.put('/:id', function(req, res, next) {
  res.send('modified language');
});

router.delete('/:id', function(req, res, next) {
  res.send('delete language');
});

module.exports = router;
