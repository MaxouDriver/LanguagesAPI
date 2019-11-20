var mongoose = require('mongoose');
 
var typoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    languages: [
        mongoose.Schema.Types.ObjectId
    ],
});
 
var Typo = mongoose.model('Typo', typoSchema);
 
module.exports = Typo;