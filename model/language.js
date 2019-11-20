var mongoose = require('mongoose');
 
var languageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    desc: String,
    creator: String,
    date: Date,
    rating: Number,
    tools: [mongoose.Schema.Types.ObjectId],
    doc: String,
    examples: [mongoose.Schema.Types.ObjectId],
});
 
var Language = mongoose.model('Language', languageSchema);
 
module.exports = Language;