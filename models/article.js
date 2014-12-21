var mongoose = require('mongoose');

var ArticleSchema = mongoose.Schema({
    title: String,
    link: String,
    date: Date,
    description: String
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
