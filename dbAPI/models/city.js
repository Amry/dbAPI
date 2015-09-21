
var db = require('mongoose');

db.connect('mongodb://localhost:27017/mydb');

var citySchema = new db.Schema({
    id: String,
    name: {type: String, required: true, unique: true},
    image: String,
    description: String    
});

module.exports = db.model('city', citySchema);