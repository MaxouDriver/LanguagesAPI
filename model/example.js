var mongoose = require('mongoose');
 
var exampleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    desc: String,
    link: String,
});
 
var Example = mongoose.model('Example', exampleSchema);
 
module.exports = Example;