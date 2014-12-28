var fs = require('fs'),
    FeedParser = require('feedparser'),
    request = require('request'),
    mongoose = require('mongoose'),
    CategoryModel = require('./../models/category'),
    ArticleModel = require('./../models/article'),
    saver = require('./saver');


var db = mongoose.connect('mongodb://localhost/laiSpider');

CategoryModel.find({}, function(error, categories) {
    if (error) {
        console.log(error);
    } else {
        // save articles to database
        categories.forEach(function (category) {
            saver.saveArticles(category);
        });
    }
});


