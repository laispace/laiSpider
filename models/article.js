var mongoose = require('mongoose');

var ArticleSchema = mongoose.Schema({
    title: String,
    link: String,
    date: Date,
    description: String,
    _category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
