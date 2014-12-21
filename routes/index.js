var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    ArticleModel = require('../models/article'),
    CategoryModel = require('../models/category');


/* home page. */
router.get('/', function(req, res) {
    ArticleModel.find({}, function(error, articles) {
        if (error) {
            console.log(error);
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
            console.log(error);
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
            throw error;
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
            throw error;
        }
        res.render('categories', {
            title: 'category',
            categories: categories
        });
    })
});
router.post('/categories', function(req, res) {
        var name =  req.body.name;
        var url =  req.body.url;

    CategoryModel.findOne({url: url}, function(error, category) {
        if (error) {
            throw error;
        } else if (category) {
            res.send(url + '已存在');
        } else {
            var newCategory = new CategoryModel({
                name: name,
                url: url
            });
            newCategory.save(function (error) {
                if (error) {
                    res.send(url + '添加失败，请重试。');
                } else {
                    res.send(url + '添加成功。');
                    // TODO start spider to scrach this feed
                }
            });
        }
    })
});
router.get('/categories/:id', function(req, res) {
    var id = req.params.id;
    CategoryModel.findById(id, function(error, category) {
        if (error) {
            console.log(error);
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


// add category
router.get('/add', function(req, res) {
        res.render('add', {
            title: 'add category'
        });
});


module.exports = router;
