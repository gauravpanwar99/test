var express = require('express');
// const { Router } = require('express');
var router = express.Router();


// Get page model 
var Page = require('../models/page');
// const { body, validationResult } = require('express-validator');
router.get('/', function (req, res) {
    // res.render('index', {
    //     'title': 'Admin Home'
    // })
    Page.find({}).sort({
        sorting: 1
    }).exec(function (err, pages) {
        res.render('admin/pages', {
            pages: pages
        });
    });
    // res.send('admin');
});



router.get('/add-page', function (req, res) {

    var title = '';
    var slug = '';
    var content = '';
    // res.send('admddin');
    res.render('admin/add_page', {
        title: title,
        slug: slug,
        content: content
    });
});

router.post('/add-page', function (req, res) {

    req.checkBody('title', 'Title can not be empty').notEmpty();
    req.checkBody('content', 'content can not be empty').notEmpty();

    var title = req.body.title;
    var slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
    var content = req.body.content;
    if (slug == '') slug = title.replace(/\s+/g, '-').toLowerCase();
    // console.log(slug);
    var errors = req.validationErrors();

    if (errors) {
        console.log('1111');
        res.render('admin/add_page', {
            errors: errors,
            title: title,
            slug: slug,
            content: content
        });
        console.log('err');
    } else {
        console.log('success');
        Page.findOne({
            slug: slug
        }, function (err, page) {
            if (page) {
                req.flash('danger', 'Page slug exists, choose another');
                res.render('admin/add_page', {
                    // errors: errors,
                    title: title,
                    slug: slug,
                    content: content
                });
            } else {
                var page = new Page({
                    title: title,
                    slug: slug,
                    content: content,
                    sorting: 100
                });

                page.save(function (err) {
                    if (err) return console.log(err);
                    req.flash('success', 'Page added');
                    res.redirect('/admin/pages');

                });
            }
        });
    }

});

module.exports = router;