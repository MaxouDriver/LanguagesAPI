var express = require('express');
var mongoose = require('mongoose');
var Tag = require('../model/tag');
var router = express.Router();

router.get('/', function(req, res, next) {
  Tag.find({}, function(err, tags) {
    return res.send(tags);  
  });
});

router.get('/:id', function(req, res, next) {
  Tag.find({_id: req.params.id}, function(err, tag) {
    return res.send(tag);  
  });
});

router.post('/', function(req, res, next) {
  var tag = req.body.tag;

  if (tag === undefined) {
    return res.status(500).send({error: true, message: "Missing parameter tag"});
  } 

  var testTag = new Tag({
    _id: new mongoose.Types.ObjectId(),
    tag: tag,
  });

  testTag.save(function(err) {
      if (err) return res.status(500).send({error: true, message: "Error happened when trying to save tag."});
      
      return res.send({error: false, message: "Tag successfully saved"});
  });
});

router.put('/:id', function(req, res, next) {
  var newData = {};
  var tag = req.body.tag;

  if (tag !== undefined) newData.tag = tag;

  if (tag === undefined) {
    return res.status(500).send({error: true, message: "Nothing to modify"});
  } 

  Tag.findOneAndUpdate({_id : req.params.id}, newData, {upsert:true}, function(err, doc){
    if (err) return res.status(500).send({error: true, message: "Error happened when trying to modify tag"});
    return res.send({error: false, message: "Tag successfully modified"});
  });
});

router.delete('/:id', function(req, res, next) {
  Tag.remove({ _id: req.params.id }, function(err) {
    if (err) return res.status(500).send({error: true, message: "Error happened when trying to delete tag"});
    return res.send({error: false, message: "Tag successfully deleted"});
  });
});

module.exports = router;

