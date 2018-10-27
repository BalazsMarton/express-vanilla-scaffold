const mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
	title: String,
	details:String,
	date: {
		type: Date,
		default: Date.now
	}
});
mongoose.model('Book', BookSchema);
