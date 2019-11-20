var express = require('express');
var router = express.Router();
var db = require('../utils/database.js');

router.get('/:id_typo', function(req, res, next) {
  res.send('search with typo by id '+ req.params.id_typo);
});

module.exports = router;
