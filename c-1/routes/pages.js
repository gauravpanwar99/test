var express = require('express');
// const { Router } = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('index', {
        'title':'Home'
    });
});

router.get('/abc', function(req, res){
    res.render('index', {
        'title':'Home'
    });
});

module.exports = router;