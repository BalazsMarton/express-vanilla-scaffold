const mongoose = require('mongoose');

require('../models/book');

const Book = mongoose.model('Book');

exports.index = (req,res)=>{
	res.render('books/index',{
		title:'Books Index',
	})
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
	new Book(newBook).save()
	res.end()
	
};

exports.book_show = (req,res)=>{
	Book
	.findOne({
		_id: req.params.id
	}, (err,book)=>{
		if (!book) res.status(404).json('The book with the given ID is deleted or disappeared');
		else res.json(book)
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
		res.end()
	})
};

exports.book_delete = (req,res)=>{
	Book
	.deleteOne({
		_id: req.params.id
	})
	.then(res.end())
};