/**
 * サーバーサンプル
 */

var async = require('async');
var express = require('express');
var glob = require('glob');

// config セットアップ＆取得
var config = require('./lib/env/index').setup();

// ログ初期化＆取得
var log4js = require('log4js');
log4js.configure(config.logging);
var logger = log4js.getLogger('server');

logger.info('Node version is', process.version);

function setup(callback) {
    // メインサーバーセットアップ
    var app = express();

    // 各API追加
    var files = glob.sync(__dirname + '/lib/application/controller/**/*.js');
    files.forEach(function(filePath) {
        logger.info('Main server setup routes', filePath);        
        require(filePath)._routes(app);
    });

    appServer = app.listen(config.server.port, function() {
        var host = appServer.address().address;
        var port = appServer.address().port;
        logger.info('Main server started on', host, port);
        callback();
    });
}
setup(console.log);
