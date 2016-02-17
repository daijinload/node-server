/**
 * @fileoverview sample test code.
 */

var SuperTest = require('supertest');
var express = require('express');
var bodyParser = require('body-parser');

// power-assertを使う場合、mochaのオプションを追加する必要があるので、
// 注意です。【mocha --require intelli-espower-loader test/sample.js】
// mocha.optsにあれば、指定しなくてもおｋ
// supertestだけ試したい場合は、assertをコメントアウトしてください。
var assert = require('power-assert');
require('espower-loader')({
    // directory where match starts with
    cwd: process.cwd(),
    // glob pattern using minimatch module
    pattern: '../test/**/*.js'
});

// app setup
var app = require('express')();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.disable('x-powered-by');
app.use(function(err, req, res, next) {
    if (err) {
        logger.error(err);
    }
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

// logic setup
app.post('/user', function(req, res) {
    console.log('req.headers:', req.headers);
    console.log('req.body:', req.body);
    console.log('req.query:', req.query);
    console.log('req.params:', req.params);
    res.json({name: 'tobi'});
});

describe('hoge/sample.js', function() {
    describe('正常系 post', function() {
        it('sample', function(done) {
            SuperTest(app)
            .post('/user')
            .send({aaa: 'aaa1', bbb: 'bbb1'})
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect('content-length', '15')
            .expect(200)
            .end(function(err, res) {
                assert.deepEqual(res.body, {name: 'aaa'});
                if (err)
                    throw err;
                done();
            });
        });
    });
});
