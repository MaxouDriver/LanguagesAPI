const mongoose = require('mongoose');
 
const toolSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    link: String,
    type: [ mongoose.Schema.Types.ObjectId ],
    use: [
        mongoose.Schema.Types.ObjectId
    ],
});
 
const Tool = mongoose.model('Tool', toolSchema);
 
module.exports = Tool;