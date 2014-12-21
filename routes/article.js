var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	ArticleModel = require('../models/article');

router.get('/:title', function(req, res) {
	var title = req.params.title;
	var db = mongoose.connect('mongodb://localhost/laiSpider').connection;
	db.on('error', function (error) { console.log(error); });
	db.on('open', function () {
		ArticleModel.find({title: title}, function (error, articles) {
			db.close();
			if (error) {
				console.log(error);
			}
			res.render('article', {
			    title: 'Express',
			    article: articles[0]
			});
		})
	});

    
});

module.exports = router;
