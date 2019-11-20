var express = require('express');
var mongoose = require('mongoose');
var Example = require('../model/example');
var router = express.Router();

router.get('/', function(req, res, next) {
  Example.find({}, function(err, examples) {
    return res.send(examples);  
  });
});

router.get('/:id', function(req, res, next) {
  Example.find({_id: req.params.id}, function(err, example) {
    return res.send(example);  
  });
});

router.post('/', function(req, res, next) {
  var title = req.body.title;
  var desc = req.body.desc;
  var link = req.body.link;

  if (title === undefined || desc === undefined || link === undefined) {
    return res.status(500).send({error: true, message: "Missing parameter, please refer to doc"});
  } 

  var testExample = new Example({
    _id: new mongoose.Types.ObjectId(),
    title: title,
    desc: desc,
    link: link
  });

  testExample.save(function(err) {
      if (err) return res.status(500).send({error: true, message: "Error happened when trying to save example."});
      
      return res.send({error: false, message: "Example successfully saved"});
  });
});

router.put('/:id', function(req, res, next) {
  var newData = {};
  var title = req.body.title;
  var desc = req.body.desc;
  var link = req.body.link;

  if (title !== undefined) newData.title = title;
  if (desc !== undefined) newData.desc = desc;
  if (link !== undefined) newData.link = link;

  if (title === undefined && link === undefined && desc === undefined) {
    return res.status(500).send({error: true, message: "Nothing to modify"});
  } 

  Example.findOneAndUpdate({_id : req.params.id}, newData, {upsert:true}, function(err, doc){
    if (err) return res.status(500).send({error: true, message: "Error happened when trying to modify example"});
    return res.send({error: false, message: "Example successfully modified"});
  });
});

router.delete('/:id', function(req, res, next) {
  Example.remove({ _id: req.params.id }, function(err) {
    if (err) return res.status(500).send({error: true, message: "Error happened when trying to delete example"});
    return res.send({error: false, message: "Example successfully deleted"});
  });
});

module.exports = router;

