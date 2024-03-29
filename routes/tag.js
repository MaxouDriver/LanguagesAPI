const express = require('express');
const mongoose = require('mongoose');
const Tag = require('../model/tag');
const router = express.Router();

router.get('/', function(req, res, next) {
  Tag.find({}, function(err, tags) {
    return res.status(200).send(tags);  
  });
});

router.get('/:id', function(req, res, next) {
  Tag.find({_id: req.params.id}, function(err, tag) {
    return res.status(200).send(tag);  
  });
});

router.post('/', function(req, res, next) {
  const tag = req.body.tag;

  if (tag === undefined) {
    return res.status(400).send({error: true, message: "Missing parameter tag"});
  } 

  const testTag = new Tag({
    _id: new mongoose.Types.ObjectId(),
    tag: tag,
  });

  testTag.save(function(err) {
      if (err) return res.status(500).send({error: true, message: "Error happened when trying to save tag."});
      
      return res.status(201).send({error: false, message: "Tag successfully saved"});
  });
});

router.put('/:id', function(req, res, next) {
  let newData = {};
  const tag = req.body.tag;

  if (tag !== undefined) newData.tag = tag;

  if (tag === undefined) {
    return res.status(400).send({error: true, message: "Nothing to modify"});
  } 

  Tag.findOneAndUpdate({_id : req.params.id}, newData, {upsert:true}, function(err, doc){
    if (err) return res.status(500).send({error: true, message: "Error happened when trying to modify tag"});
    return res.status(200).send({error: false, message: "Tag successfully modified"});
  });
});

router.delete('/:id', function(req, res, next) {
  Tag.remove({ _id: req.params.id }, function(err) {
    if (err) return res.status(500).send({error: true, message: "Error happened when trying to delete tag"});
    return res.status(200).send({error: false, message: "Tag successfully deleted"});
  });
});

module.exports = router;

