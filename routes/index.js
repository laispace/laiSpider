var express = require('express'),
    router = express.Router(),
    debug = require('debug')('laiSpider'),
    mongoose = require('mongoose'),
    ArticleModel = require('../models/article'),
    CategoryModel = require('../models/category'),
    saver = require('../spiders/saver');

function handleError(error) {
    res.status(500)
        .render('error', {
            message: 'ops, something wrong :(',
            error: error
        });
}

/* home page. */
router.get('/', function(req, res) {
    ArticleModel.find({}, function(error, articles) {
        if (error) {
            res.status(500)
                .render('error', {
                    message: 'ops, something wrong :(',
                    error: error
                });
        }

        res.render('articles', {
            title: 'articles',
            articles: articles
        });
    })
});

// article page
router.get('/articles', function(req, res) {
    ArticleModel.find({}, function(error, articles) {
        if (error) {
            handleError(error);
        }
        res.render('articles', {
            title: 'articles',
            articles: articles
        });
    })
});
router.get('/articles/:id', function(req, res) {
    var id = req.params.id;
    ArticleModel.findById(id, function(error, article) {
        if (error) {
            handleError(error);
        }
        ArticleModel.findById(id).populate('_category').exec(function (error, article) {
            console.log(article);
            res.render('article', {
                title: article.title,
                article: article
            });
        });


    })
});


// categories page
router.get('/categories', function(req, res) {
    CategoryModel.find({}, function(error, categories) {
        if (error) {
            handleError(error);
        }
        res.render('categories', {
            title: 'category',
            categories: categories
        });
    })
});
// add a category
router.post('/categories', function(req, res) {
        var name =  req.body.name;
        var url =  req.body.url;

    CategoryModel.findOne({url: url}, function(error, category) {
        if (error) {
            handleError(error);
        } else if (category) {
            res.send(url + '已存在');
        } else {
            var newCategory = new CategoryModel({
                _id: mongoose.Types.ObjectId(),
                name: name,
                url: url
            });
            newCategory.save(function (error) {
                if (error) {
                    res.send(url + '添加失败，请重试。');
                } else {
                    res.send(url + '添加成功。');
                    // save articles to database
                    saver.saveArticles(newCategory);
                }
            });
        }
    })
});
// category page
router.get('/categories/:id', function(req, res) {
    var id = req.params.id;
    CategoryModel.findById(id, function(error, category) {
        if (error) {
            handleError(error);
        } else {
            CategoryModel.findById(id).populate('articles').exec(function (error, category) {
                if (error) {
                    console.log(error);
                } else {
                    res.render('category', {
                        title: category.name,
                        category: category,
                        articles: category.articles
                    });
                }
            });
        }

    })
});

// add category page
router.get('/add', function(req, res) {
    res.render('add', {
        title: 'add category'
    });
});


module.exports = router;
