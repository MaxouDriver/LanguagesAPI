const mongoose = require('mongoose');
 
const exampleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    desc: String,
    link: String,
});
 
const Example = mongoose.model('Example', exampleSchema);
 
module.exports = Example;