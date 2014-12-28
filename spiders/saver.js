var fs = require('fs'),
    FeedParser = require('feedparser'),
    request = require('request'),
    mongoose = require('mongoose'),
    CategoryModel = require('./../models/category'),
    ArticleModel = require('./../models/article');

function saveArticles(category) {
    var name = category.name,
            url = category.url,
            feedparser = new FeedParser();

    request
        .get(url)
        .on('error', function(error) {
            console.log(error);
        })
        .on('response', function(res) {
            if (res.statusCode != 200) {
                console.error(new Error('Bad status code'));
            } else {
                res.pipe(feedparser);
            }
        });
    feedparser
        .on('error', function(error) {
            console.log(error);
        })
        .on('data', function(item) {
            var article = {
                _id: new mongoose.Types.ObjectId(),
                title: item.title,
                link: item.link,
                date: item.date,
                description: item.description,
                _category: category._id
            };

            category.articles.push(article._id);
            category.save(function(error) {
                if (error) {
                    console.loge(error);
                } else {
                    ArticleModel.findOne({
                        title: item.title,
                        link: item.link
                    }, function(error, oldArticle) {
                        if (error) {
                            console.error(error);
                        } else if (oldArticle) {
                            console.log('article exist: ', oldArticle.title);
                        } else {
                            var newArticle = new ArticleModel(article);
                            newArticle.save(function(error) {
                                if (error) {
                                    console.error(error);
                                } else {
                                    console.log('article added: ', article.title);
                                }
                            });
                        }
                    });
                }
            });
        })
        .on('end', function() {
            // db.disconnect();
        });
}

exports.saveArticles = saveArticles;
