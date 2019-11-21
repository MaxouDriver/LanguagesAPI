const mongoose = require('mongoose');
 
const tagSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tag: String,
});
 
const Tag = mongoose.model('Tag', tagSchema);
 
module.exports = Tag;