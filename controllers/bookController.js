const mongoose = require('mongoose');

require('../models/book');

const Book = mongoose.model('Book');

exports.index = (req,res)=>{
	Book
	.find()
	.sort({date:'desc'})
	.then(books=>{
		res.render('books/index',{
			title:'Books Index',
			books:books
		})
	});
};

exports.book_list = (req,res)=>{
	Book
	.find()
	.sort({date:'desc'})
	.then(books=>{
		res.json(books);
	});
};

exports.book_save = (req,res)=>{
	const newBook = {
		title: req.body.title,
		details: req.body.details
	};
	new Book(newBook).save();
	res.end()
};

exports.book_show = (req,res)=>{
	Book
	.findOne({
		_id: req.params.id
	})
	.then(book=>{
		res.json(book);
	})
};

exports.book_edit = (req,res)=>{
	Book
	.findOne({
		_id: req.params.id
	})
	.then(book=>{
		book.title = req.body.title,
		book.details = req.body.details

		book.save()
		.then((books)=>{
			res.json(books);
		})
	})
};

exports.book_delete = (req,res)=>{
	Book
	.deleteOne({
		_id: req.params.id
	})
	.then((books)=>{
		res.json(books);
	})
};