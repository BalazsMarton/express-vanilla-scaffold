
if (document.getElementById('booksList')){

function initBooksNav(){
	$('#booksList').before(`
	<div class="row py-5 px-3">
				<!-- Button trigger modal -->
				<button id="addBookButton" type="button" class="btn btn-lg btn-outline-secondary" onclick="renderNewBookForm()">
					Add
				</button>		

				<!-- Modal -->
				<div class="modal fade" id="bookModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog modal-lg" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="bookModalLabel"></h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div id="bookModalBody" class="modal-body">
								<div id="loader"></div>
							</div>
							<div class="modal-footer">
								
							</div>
						</div>
					</div>
				</div>

			</div>
	`);
}

function listBooks(){	
	let books;
	$.getJSON(`${window.location}/api/list`, (data)=>{
		books=data;
		document.getElementById('booksList').innerHTML ='';
		for(let i =0; i< books.length; i++){
			document.getElementById('booksList').innerHTML += `
				<div id="book_${books[i]._id}" class="book col-sm-12 col-md-12 col-lg-12 col-xl-12 p-3">
					<div class="card">
					  <div class="card-body text-justify">
					    <h4 class="card-title">${books[i].title}</h4>
					    <p class="card-text">${books[i].details}</p>
					    <button id="${books[i]._id}" class="edit-book-button btn btn-info btn-block" onclick="renderEditBookForm()">edit</a>
					    <button id="${books[i]._id}" class="delete-book-button btn btn-danger btn-block" onclick="deleteBook()">delete</a>
					  </div>
					</div>
				</div>
			`
		}
	});
};

function renderBookForm(){
	
	document.getElementById('bookModalBody').innerHTML=(`
			<div class="form-group">	
				<input type="text" class="form-control" id="bookTitle" name="title" placeholder="title"><br>
				<textarea type="text" class="form-control" id="bookDetails" name="details" rows="6" placeholder="details" ></textarea><br>
			</div>
	`);
}

function renderNewBookForm(){
	document.querySelector('.modal-footer').innerHTML=(`
		<button type="submit" class="btn btn-lg btn-outline-secondary" onclick="sendNewBookForm()">add</button>
	`)
	document.getElementById('bookModalLabel').innerHTML=('Add new book')
	$('#bookModal').modal('show')
	
	renderBookForm();
	
}

function renderEditBookForm(){
	let target = event.target || event.srcElement;
	let bookId = target.id

	document.querySelector('.modal-footer').innerHTML=(`
		<button type="submit" class="btn btn-lg btn-outline-secondary" onclick="sendEditBookForm()">edit</button>
	`)
	document.getElementById('bookModalLabel').innerHTML=('Edit book');
	$('#bookModal').modal('show');
	
	$.getJSON(`${window.location}/api/${bookId}`, (data)=>{
		renderBookForm();

		const book= data;

		let inputBookTitle = document.getElementById("bookTitle");
		let att = document.createAttribute('value')
		att.value = book.title;
		inputBookTitle.setAttributeNode(att);  
		
		document.getElementById('bookDetails').innerText=book.details;
		document.querySelector('#bookModalBody .form-group').innerHTML += (`
			<input type="hidden" name="_id" value="${book._id}" id="bookId">
		`);	
	});
}

function sendNewBookForm(){
	document.getElementById('booksList').innerHTML='<div id="loader"></div>';

	let formData ={};
	formData.title = document.getElementById('bookTitle').value;
	formData.details = document.getElementById('bookDetails').value;
		
	$.ajax({
    type: 'POST',
    data: formData,
    url: `${window.location}/api`,
	}).done(()=>{	
		listBooks();
	});

	$('#bookModal').modal('hide');
}

function sendEditBookForm(){
	document.getElementById('booksList').innerHTML='<div id="loader"></div>';

	let formData ={};
	formData._id = document.getElementById('bookId').value;
	formData.title = document.getElementById('bookTitle').value;
	formData.details = document.getElementById('bookDetails').value;
		
	$.ajax({
    type: 'PUT',
    data: formData,
    url: `${window.location}/api/edit/${formData._id}`,
	}).done(()=>{
		listBooks();
	});

	$('#bookModal').modal('hide');
}

function deleteBook(){
	let target = event.target || event.srcElement;
	let bookId = target.id

	$.ajax({
    type: 'DELETE',
    url: `${window.location}/api/${bookId}`,
	}).done(()=>{
		$(`#book_${bookId}`).fadeOut(500, function(){
			this.remove();
		})
	})
}

listBooks();
initBooksNav();
$('#bookModal').on('hidden.bs.modal', function (e) {
  	document.getElementById('bookModalBody').innerHTML=(`
		<div id="loader"></div>
	`);
})

};