/**
 * @fileoverview データベースを管理するクラス
 */

/**
 * Module dependencies.
 */
var config = require('../../../lib/env/local');
var collections = require('./collections');
var logger = require('log4js').getLogger('server');

// 無理やりだが、ドライバーのログ処理を上書きする。
//var mongoDriverLogger = require('log4js').getLogger('mongodriver');
//var _Logger = require('mongodb').Logger;
//_Logger.prototype.debug = function(message, object) {
//    if (message.indexOf('issue initial query') === 0
//        || message.indexOf('executing') === 0) {
//        mongoDriverLogger.debug(message, object);
//    }
//    mongoDriverLogger.debug(message, object);
//
//    if (message.indexOf('writing buffer') === 0){
//        return;
//    }
//
//    if(this.isDebug()) {
//        var state = {
//            type: 'debug',
//            message: message,
//            className: this.className
//        };
//        if(object) state.meta = object;
//        mongoDriverLogger.debug(state);
//    }
//};
//_Logger.prototype.info = function(message, object) {
//    mongoDriverLogger.info(message, object);
//};
//_Logger.prototype.error = function(message, object) {
//    mongoDriverLogger.error(message, object);
//};
//_Logger.prototype.isDebug = function() {
//    return true;
//};
var MongoClient = require('mongodb').MongoClient;

var db;
exports.connectInfo = function() {
    return db.options;
};

exports.open = function(callback) {

    var dbConf = config.db;
    var url = 'mongodb://' + dbConf.host + ':' + dbConf.port + '/' + dbConf.name;
    var options = {
        server: {
            poolSize: 2,
            socketOptions: {
                autoReconnect: true
            }
        },
        db: {
            w: 1,
            j: false
        }
    };

    // Use connect method to connect to the Server
    MongoClient.connect(url, options, function(err, _db) {
        if (err) {
            callback(err);
            return;
        }
        db = _db;

        // コレクション設定
        collections.forEach(function(conf) {
            exports[conf.name] = _db.collection(conf.name);
            logger.info('config find collection', conf.name);
        });

        // 設定があれば、index作成
        collections.filter(function(conf) {
            return conf.options && conf.options.ensureIndexs;
        }).forEach(function(conf) {
            var indexs = conf.options.ensureIndexs;
            indexs.forEach(function(index) {
                var col = exports[conf.name];
                col.ensureIndex(index.key, index.option, function(err) {

                    // ほとんどエラーにならないので非同期でログ出力
                    if (err) {
                        logger.error(err);
                    }
                });
                logger.info('ensureIndex collection', conf.name, index);
            });
        });
        callback();
    });
};

exports.close = function(callback) {
    callback = callback || function() {
    };
    db.close(callback);
};
