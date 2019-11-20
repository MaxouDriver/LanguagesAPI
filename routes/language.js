var express = require('express');
var mongoose = require('mongoose');
var Language = require('../model/language');
var router = express.Router();

router.get('/', function(req, res, next) {
  Language.find({}, function(err, languages) {
    return res.send(languages);  
  });
});

router.get('/:id', function(req, res, next) {
  Language.find({_id: req.params.id}, function(err, language) {
    return res.send(language);  
  });
});

router.post('/', function(req, res, next) {
  var name = req.body.name;
  var desc = req.body.desc;
  var creator = req.body.creator;
  var date = new Date(parseInt(req.body.date));
  var rating = req.body.rating;
  var tools = req.body.tools || [];
  var doc = req.body.doc;
  var examples = req.body.examples || [];

  if (name === undefined || desc === undefined || creator === undefined ||
        date === undefined || rating === undefined || 
        doc === undefined ) {
          return res.status(500).send({error: true, message: "Missing parameter, please refer to the doc"});
  } 

  var testLanguage = new Language({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    desc: desc,
    creator: creator,
    date: date,
    rating: rating,
    tools: tools,
    doc: doc,
    examples: examples
  });

  testLanguage.save(function(err) {
      if (err) return res.status(500).send({error: true, message: err});
      
      return res.send({error: false, message: "Language successfully saved"});
  });
});

router.put('/:id', function(req, res, next) {
  var newData = {};
  var name = req.body.name;
  var desc = req.body.desc;
  var creator = req.body.creator;
  var date = req.body.date;
  var rating = req.body.rating;
  var tools = req.body.tools;
  var doc = req.body.doc;
  var examples = req.body.examples;

  if (name !== undefined) newData.name = name;
  if (desc !== undefined) newData.desc = desc;
  if (creator !== undefined) newData.creator = creator;
  if (date !== undefined) newData.date = date;
  if (rating !== undefined) newData.rating = rating;
  if (tools !== undefined) newData.tools = tools;
  if (doc !== undefined) newData.doc = doc;
  if (examples !== undefined) newData.examples = examples;

  if (name === undefined && desc === undefined && creator === undefined &&
        date === undefined && rating === undefined && tools === undefined &&
        doc === undefined && examples === undefined) {
          return res.status(500).send({error: true, message: "Nothing to modify"});
  } 

  Language.findOneAndUpdate({_id : req.params.id}, newData, {upsert:true}, function(err, doc){
    if (err) return res.status(500).send({error: true, message: err});
    return res.send({error: false, message: "Language successfully modified"});
  });
});

router.delete('/:id', function(req, res, next) {
  Language.remove({ _id: req.params.id }, function(err) {
    if (err) return res.status(500).send({error: true, message: "Error happened when trying to delete language"});
    return res.send({error: false, message: "Language successfully deleted"});
  });
});

module.exports = router;
