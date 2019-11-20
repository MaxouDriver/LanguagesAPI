const mongoose = require('mongoose');
 
const typoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    languages: [
        mongoose.Schema.Types.ObjectId
    ],
});
 
const Typo = mongoose.model('Typo', typoSchema);
 
module.exports = Typo;