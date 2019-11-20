var mongoose = require('mongoose');
 
var toolSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    link: String,
    type: [ mongoose.Schema.Types.ObjectId ],
    use: [
        mongoose.Schema.Types.ObjectId
    ],
});
 
var Tool = mongoose.model('Tool', toolSchema);
 
module.exports = Tool;