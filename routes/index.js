var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/variable', function(req, res, next) {
	res.render('variable', {
		'title' : 'Basic Variable Example',
		'user': {
			'firstName' : 'Sumit',
			'lastName' : 'Gupta',
			'email' : 'sg1096@gmail.com'
		},
		layout : 'single'
	});
});

module.exports = router;
