var 
	express = require('express'),
	router = express.Router();

// Controllers
var book_controller = require('../controllers/bookController');

// GET home page

router.get('/', book_controller.index);

router.get('/api/list', book_controller.book_list);
router.post('/api', book_controller.book_save);
router.get('/api/:id', book_controller.book_show);
router.put('/api/edit/:id', book_controller.book_edit);
router.delete('/api/:id', book_controller.book_delete);

module.exports = router;
