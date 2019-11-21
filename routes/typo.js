const express = require('express');
const mongoose = require('mongoose');
const Typo = require('../model/typo');
const router = express.Router();

router.get('/', function(req, res, next) {
  Typo.find({}, function(err, typos) {
    return res.send({error: false, message: "Typos", data: typos});  
  });
});

router.get('/:id', function(req, res, next) {
  Typo.find({_id: req.params.id}, function(err, typo) {
    return res.send({error: false, message: "Typo successfully found", data: typo});    
  });
});

router.post('/', function(req, res, next) {
  const name = req.body.name;
  const description = req.body.description;
  const languages = req.body.languages || [];

  if (name === undefined || description === undefined) {
    return res.status(500).send({error: true, message: "Missing parameter, please refer to doc"});
  } 

  const testTypo = new Typo({
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
  let newData = {};
  const name = req.body.name;
  const description = req.body.description;
  const languages = req.body.languages;

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