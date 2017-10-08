var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
	value : String,
	updated_at : {type : Date,default : Date.now} 
});

module.exports = mongoose.model('Item',ItemSchema);