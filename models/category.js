var mongoose = require('mongoose');

var CategorySchema = mongoose.Schema({
    name: String,
    url: String,
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }]
});


var Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
