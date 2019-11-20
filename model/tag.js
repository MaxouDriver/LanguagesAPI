var mongoose = require('mongoose');
 
var tagSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tag: String,
});
 
var Tag = mongoose.model('Tag', tagSchema);
 
module.exports = Tag;