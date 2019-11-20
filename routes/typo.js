var express = require('express');
var mongoose = require('mongoose');
var Typo = require('../model/typo');
var router = express.Router();

router.get('/', function(req, res, next) {
  Typo.find({}, function(err, typos) {
    return res.send(typos);  
  });
});

router.get('/:id', function(req, res, next) {
  Typo.find({_id: req.params.id}, function(err, typo) {
    return res.send(typo);  
  });
});

router.post('/', function(req, res, next) {
  var name = req.body.name;
  var description = req.body.description;
  var languages = req.body.languages || [];

  if (name === undefined || description === undefined) {
    return res.status(500).send({error: true, message: "Missing parameter, please refer to doc"});
  } 

  var testTypo = new Typo({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    description: description,
    languages: languages
  });

  testTypo.save(function(err) {
      if (err) return res.status(500).send({error: true, message: "Error happened when trying to save typo."});
      
      return res.send({error: false, message: "Typo successfully saved"});
  });
});

router.put('/:id', function(req, res, next) {
  var newData = {};
  var name = req.body.name;
  var description = req.body.description;
  var languages = req.body.languages;

  if (name !== undefined) newData.name = name;
  if (description !== undefined) newData.description = description;
  if (languages !== undefined) newData.languages = languages;

  if (name === undefined && description === undefined && languages === undefined) {
    return res.status(500).send({error: true, message: "Nothing to modify"});
  } 

  Typo.findOneAndUpdate({_id : req.params.id}, newData, {upsert:true}, function(err, doc){
    if (err) return res.status(500).send({error: true, message: "Error happened when trying to modify typo"});
    return res.send({error: false, message: "Typo successfully modified"});
  });
});

router.delete('/:id', function(req, res, next) {
  Typo.remove({ _id: req.params.id }, function(err) {
    if (err) return res.status(500).send({error: true, message: "Error happened when trying to delete typo"});
    return res.send({error: false, message: "Typo successfully deleted"});
  });
});

module.exports = router;