/**
 * @fileoverview test setup.データベースなど使用するテストの場合使用する。
 */

var async = require('async');

// config セットアップ＆取得
var config = require('../lib/core/config').setup('../../conf/test');
var db = require('../lib/core/db');
var repository = require('../lib/core/repository');

// ログ初期化＆取得
var log4js = require('log4js');
log4js.configure(config.logging);
var logger = log4js.getLogger('kerberos');

logger.info('Node version is', process.version);

var isAlreadySetup = false;
exports.database = function(callback) {
    if (isAlreadySetup) {
        allRemoveCollections(db, config.db.collections, callback);
        return;
    }
    async.series([
        function(next) {
            db.open(next);
        },
        function(next) {
            // データを一旦すべて削除する。
            allRemoveCollections(db, config.db.collections, next);
        },
        function(next) {
            repository.setup(next);
        },
        function(next) {
            isAlreadySetup = true;
            next();
        }
    ], callback);
};

// データを一旦すべて削除する。
function allRemoveCollections(db, configs, callback) {
    var list = configs.filter(function(conf) {
        return !!(db[conf.name]);
    });
    async.each(list, function(conf, next) {
        db[conf.name].remove({}, next);
        logger.info('remove collection', conf.name);
    }, callback);
}
