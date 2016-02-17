/**
 * @fileoverview コンフィグ情報を作成するクラス
 */

/**
 * Module dependencies.
 */
var commander = require('commander');
var package = require('../../package');

function parse(commander) {
    return commander
    .version(package.version)
    .option('-p, --port [num]', '起動番号：ポートで使用する default 8080', 8080)
    .parse(process.argv);
}

exports.setup = function() {
    var data = parse(commander);

    var env = (process.env.NODE_ENV || 'local');
    var _conf = require('./' + env);
    Object.keys(_conf).forEach(function(key) {
        exports[key] = _conf[key];
    });
    console.log('config mode:', exports.mode);

    // ポート設定
    var port = Number(data.port);
    if (port !== 0) {
        exports.server.port = port;
        exports.monitor.port = port + 2000; // TODO これで良いか？
    }

    // ログファイル名にport番号をつける。
    exports.logging.appenders.forEach(function(appender) {
        appender.filename = appender.filename + '.' + port + '.log';
    });

    return exports;
};
