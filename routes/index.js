var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	ArticleModel = require('../models/article');

/* GET home page. */
router.get('/', function(req, res) {
	var db = mongoose.connect('mongodb://localhost/laiSpider').connection;
	db.on('error', function (error) { console.log(error); });
	db.on('open', function () {
		ArticleModel.find({}, function (error, articles) {
			db.close();
			if (error) {
				console.log(error);
			}
			res.render('index', {
			    title: 'Express',
			    articles: articles
			});
		})
	});

    
});

module.exports = router;
