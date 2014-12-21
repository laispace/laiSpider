var express = require('express'),
    router = express.Router();

// categories
router.route('/categories')
    .get(function(req, res, next) {
        res.send('获取目录');
    })
    .post(function(req, res, next) {
        res.send('新增目录');
    })

// favarites
router.route('/favarites/')
    .get(function(req, res, next) {
        res.send('获取收藏列表' );
    }).post(function(req, res, next) {
        res.send('新增收藏');
    });
router.route('/favarites/:id')
    .get(function(req, res, next) {
        res.send('获取收藏: ' + req.params.id);
    }).put(function(req, res, next) {
        res.send('修改收藏: ' + req.params.id);
    }).delete(function(req, res, next) {
        res.send('删除收藏: ' + req.params.id);
    });

module.exports = router;
