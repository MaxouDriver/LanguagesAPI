var express = require('express');
var mongoose = require('mongoose');
var Tool = require('../model/tool');
var router = express.Router();

router.get('/', function(req, res, next) {
  Tool.find({}, function(err, tools) {
    return res.send(tools);  
  });
});

router.get('/:id', function(req, res, next) {
  Tool.find({_id: req.params.id}, function(err, tool) {
    return res.send(tool);  
  });
});

router.post('/', function(req, res, next) {
  var name = req.body.name;
  var link = req.body.link;
  var type = req.body.type || [];
  var use = req.body.use || [];

  if (name === undefined || link === undefined) {
    return res.status(500).send({error: true, message: "Missing parameter, please refer to doc"});
  } 

  var testTool = new Tool({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    link: link,
    type: type,
    use: use
  });

  testTool.save(function(err) {
      if (err) return res.status(500).send({error: true, message: "Error happened when trying to save tool."});
      
      return res.send({error: false, message: "Tool successfully saved"});
  });
});

router.put('/:id', function(req, res, next) {
  var newData = {};
  var name = req.body.name;
  var link = req.body.link;
  var type = req.body.type;
  var use = req.body.use;

  if (name !== undefined) newData.name = name;
  if (link !== undefined) newData.link = link;
  if (type !== undefined) newData.type = type;
  if (use !== undefined) newData.use = use;

  if (name === undefined && link === undefined && type === undefined && use === undefined) {
    return res.status(500).send({error: true, message: "Nothing to modify"});
  } 

  Tool.findOneAndUpdate({_id : req.params.id}, newData, {upsert:true}, function(err, doc){
    if (err) return res.status(500).send({error: true, message: "Error happened when trying to modify tool"});
    return res.send({error: false, message: "Tool successfully modified"});
  });
});

router.delete('/:id', function(req, res, next) {
  Tool.remove({ _id: req.params.id }, function(err) {
    if (err) return res.status(500).send({error: true, message: "Error happened when trying to delete tool"});
    return res.send({error: false, message: "Tool successfully deleted"});
  });
});

module.exports = router;

