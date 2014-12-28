var fs = require('fs'),
    FeedParser = require('feedparser'),
    request = require('request'),
    mongoose = require('mongoose'),
    CategoryModel = require('./../models/category'),
    ArticleModel = require('./../models/article');

var feeds = require('./../feeds.json');


var db = mongoose.connect('mongodb://localhost/laiSpider');

CategoryModel.remove({}, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log('all categories emptyed.');

        ArticleModel.remove({}, function (error) {
            if (error) {
                console.log(error);
            } else {
                console.log('all articles emptyed.');

                // save categories to database
                var feedsLen = feeds.length;
                var feedsCount = 0;
                feeds.forEach(function (feed, index) {
                    var newCategory = new CategoryModel(feed);
                    newCategory.save(function (error) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('category added: ', newCategory.name);
                        }
                        if (++feedsCount === feedsLen) {
                            console.log('%s categories added', feedsLen);
                            db.disconnect();
                        }
                    });
                });
            }
        });
    }
});



