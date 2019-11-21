const express = require('express');
const mongoose = require('mongoose');
const Language = require('../model/language');
const Typo = require('../model/typo');
const router = express.Router();

router.get('/', function(req, res, next) {
  const idTypo = req.query.id_typo;
  let query = {};
  if (idTypo !== undefined) query.typos = idTypo;
  Language.find(query, function(err, languages) {
    return res.status(200).send(languages);  
  });
});

router.get('/:id', function(req, res, next) {
  Language.find({_id: req.params.id}, function(err, language) {
    return res.status(200).send(language);  
  });
});

router.post('/', function(req, res, next) {
  const {name, desc, creator, rating, doc, nameTypo, descriptionTypo} = req.body;
  const date = new Date(parseInt(req.body.date));
  const tools = req.body.tools || [];
  const examples = req.body.examples || [];
  const typos = req.body.typos || [];

  const languagesTypo = req.body.languages_typo || [];

  if (name === undefined || desc === undefined || creator === undefined ||
        date === undefined || rating === undefined || 
        doc === undefined ) {
          return res.status(400).send({error: true, message: "Missing parameter, please refer to the doc"});
  } 


  if (nameTypo === undefined || descriptionTypo === undefined) {
    return res.status(400).send({error: true, message: "Missing parameter for typography creation, please refer to doc"});
  } 

  const testLanguage = new Language({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    desc: desc,
    creator: creator,
    date: date,
    rating: rating,
    tools: tools,
    doc: doc,
    examples: examples,
    typos: typos
  });

  testLanguage.save(function(err, language) {
      if (err) return res.status(500).send({error: true, message: err});
      const testTypo = new Typo({
        _id: new mongoose.Types.ObjectId(),
        name: nameTypo,
        description: descriptionTypo,
        languages: languagesTypo.concat([language.id])
      });

      testTypo.save(function(err, typo) {
          if (err) return res.status(500).send({error: true, message: "Error happened when trying to save typo."});
          Language.findOneAndUpdate({_id: language.id},
            {                        
                "$push": {
                    "typos": [
                      typo.id                                                         
                    ]
                }
            }, {upsert:true}, function(err, doc){
            if (err) return res.status(500).send({error: true, message: err});
            return res.status(201).send({error: false, message: "Language successfully saved", data: language.id});
          });
      });
  });
});

router.put('/:id', function(req, res, next) {
  let newData = {};
  const {name, desc, creator, date, rating, tools, doc, examples, typos} = req.body;

  if (name !== undefined) newData.name = name;
  if (desc !== undefined) newData.desc = desc;
  if (creator !== undefined) newData.creator = creator;
  if (date !== undefined) newData.date = date;
  if (rating !== undefined) newData.rating = rating;
  if (tools !== undefined) newData.tools = tools;
  if (doc !== undefined) newData.doc = doc;
  if (examples !== undefined) newData.examples = examples;
  if (typos !== undefined) newData.typos = typos;

  if (name === undefined && desc === undefined && creator === undefined &&
        date === undefined && rating === undefined && tools === undefined &&
        doc === undefined && examples === undefined && typos === undefined) {
          return res.status(400).send({error: true, message: "Nothing to modify"});
  } 

  Language.findOneAndUpdate({_id : req.params.id}, newData, {upsert:true}, function(err, doc){
    if (err) return res.status(500).send({error: true, message: err});
    return res.status(200).send({error: false, message: "Language successfully modified"});
  });
});

router.delete('/:id', function(req, res, next) {
  Language.remove({ _id: req.params.id }, function(err) {
    if (err) return res.status(500).send({error: true, message: "Error happened when trying to delete language"});
    return res.status(200).send({error: false, message: "Language successfully deleted"});
  });
});

module.exports = router;
