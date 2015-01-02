var fs = require('fs'),
    debug = require('debug')('laiSpider'),
    request = require('request'),
    mongoose = require('mongoose'),
    CategoryModel = require('./../models/category'),
    ArticleModel = require('./../models/article'),
    saver = require('./saver');


var db = mongoose.connect('mongodb://localhost/laiSpider');

CategoryModel.find({}, function(error, categories) {
    if (error) {
        debug(error);
    } else {
        debug('saving articles to database');
        categories.forEach(function (category) {
            saver.saveArticles(category);
        });
    }
});


