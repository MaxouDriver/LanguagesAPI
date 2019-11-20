const mongoose = require('mongoose');
let dev_db_url = 'mongodb://127.0.0.1:27017/languagesAPI';
let mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

module.exports = connection;