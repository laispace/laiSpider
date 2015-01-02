var fs = require('fs'),
    debug = require('debug')('laiSpider'),
    Q = require('q'),
    chalk = require('chalk'),
    FeedParser = require('feedparser'),
    request = require('request'),
    mongoose = require('mongoose'),
    ArticleModel = require('./../models/article');


function saveArticleInPromise(category, article) {
    var catDeferred = Q.defer();
    category.articles.push(article._id);
    category.save(function(error) {
        if (error) {
            debug(error);
            catDeferred.reject(error);
        } else {
            ArticleModel.findOne({
                link: article.link
            }, function(error, oldArticle) {
                if (error) {
                    debug(error);
                    catDeferred.reject(error);
                } else if (oldArticle) {
                    debug('article exist: ', oldArticle.title);
                    catDeferred.resolve(oldArticle);
                } else {
                    var newArticle = new ArticleModel(article);
                    newArticle.save(function(error) {
                        if (error) {
                            debug(error);
                            catDeferred.reject(error);
                        } else {
                            debug('article added: ', article.title);
                            catDeferred.resolve(newArticle);
                        }
                    });
                }
            });
        }
    });
    return catDeferred.promise;
}


function saveArticles(category) {
    var url = category.url,
        feedparser = new FeedParser();
    var articles = [],
        promises = [];

    request
        .get(url)
        .on('error', function(error) {
            debug(error);
        })
        .on('response', function(res) {
            if (res.statusCode != 200) {
                debug(new Error('Bad status code'));
            } else {
                res.pipe(feedparser);
            }
        });
    feedparser
        .on('error', function(error) {
            debug(error);
        })
        .on('readable', function() {
            var stream = this,
                meta = this.meta,
                item;
            while(item = stream.read()) {
                var article = {
                    _id: new mongoose.Types.ObjectId(),
                    title: item.title,
                    link: item.link,
                    date: item.date,
                    description: item.description,
                    _category: category._id
                };
                articles.push(article);
            }
        })
        .on('end', function() {
            for (var i = 0; i < articles.length; i++) {
                var article = articles[i];
                var promise = saveArticleInPromise(category, article);
                promises.push(promise);
                promise.then(function (article) {
                    debug('done saving %s', chalk.green(article.title));
                }, function (error) {
                    debug(error);
                });
            }
            Q.allSettled(promises).then(function (results) {
                debug('done saving %s articles: ', chalk.green(results.length));
            });
        });
}

exports.saveArticles = saveArticles;
