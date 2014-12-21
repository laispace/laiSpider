var fs = require('fs'),
    FeedParser = require('feedparser'),
    request = require('request'),
    mongoose = require('mongoose'),
    ArticleModel = require('./models/article');

var feeds = require('./feeds.json');

var feedName = feeds[1].name;
var feedUrl = feeds[1].url;

var db = mongoose.connect('mongodb://localhost/laiSpider');
var req = request.get(feedUrl),
    feedparser = new FeedParser();

req.on('error', function(error) {
    console.log(error);
})
req.on('response', function(res) {
    if (res.statusCode != 200) {
        console.error(new Error('Bad status code'));
    } else {
        res.pipe(feedparser);
    }
});

feedparser.on('error', function(error) {
    console.log(error);
});
feedparser.on('meta', function(meta) {
    console.log('===== %s =====', meta.title);
});
feedparser.on('data', function(item) {
    var article = {
        title: item.title,
        link: item.link,
        date: item.date,
        description: item.description
    };
    ArticleModel.findOne({
        title: article.title
    }, function(error, oldArticle) {
        if (error) console.error(error);
        if (oldArticle) {
            console.log('already exist: ', oldArticle.title);
        } else {
            var newArticle = new ArticleModel(article);
            newArticle.save(function(error) {
                if (error) console.error(error);
                console.log('successfully insert: ', article.title);
            });
        }
    });
});

// close the database.
feedparser.on('end', function(meta) {
    db.disconnect();
});
