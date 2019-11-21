const express = require('express');
const mongoose = require('mongoose');
const Tool = require('../model/tool');
const router = express.Router();

router.get('/', function(req, res, next) {
  Tool.find({}, function(err, tools) {
    return res.status(200).send(tools);  
  });
});

router.get('/:id', function(req, res, next) {
  Tool.find({_id: req.params.id}, function(err, tool) {
    return res.status(200).send(tool);  
  });
});

router.post('/', function(req, res, next) {
  const {name, link} = req.body;
  const type = req.body.type || [];
  const use = req.body.use || [];

  if (name === undefined || link === undefined) {
    return res.status(400).send({error: true, message: "Missing parameter, please refer to doc"});
  } 

  const testTool = new Tool({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    link: link,
    type: type,
    use: use
  });

  testTool.save(function(err) {
      if (err) return res.status(500).send({error: true, message: "Error happened when trying to save tool."});
      
      return res.status(201).send({error: false, message: "Tool successfully saved"});
  });
});

router.put('/:id', function(req, res, next) {
  let newData = {};
  const {name, link, type, use} = req.body;

  if (name !== undefined) newData.name = name;
  if (link !== undefined) newData.link = link;
  if (type !== undefined) newData.type = type;
  if (use !== undefined) newData.use = use;

  if (name === undefined && link === undefined && type === undefined && use === undefined) {
    return res.status(400).send({error: true, message: "Nothing to modify"});
  } 

  Tool.findOneAndUpdate({_id : req.params.id}, newData, {upsert:true}, function(err, doc){
    if (err) return res.status(500).send({error: true, message: "Error happened when trying to modify tool"});
    return res.status(200).send({error: false, message: "Tool successfully modified"});
  });
});

router.delete('/:id', function(req, res, next) {
  Tool.remove({ _id: req.params.id }, function(err) {
    if (err) return res.status(500).send({error: true, message: "Error happened when trying to delete tool"});
    return res.status(200).send({error: false, message: "Tool successfully deleted"});
  });
});

module.exports = router;

