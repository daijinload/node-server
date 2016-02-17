/**
 * @fileoverview モニター処理
 */

/*
 * Module dependencies
 */
var logger = require('log4js').getLogger('server');

// main
module.exports = function(app) {

    // live page
    app.get('/', info);

    return app;
};

// プロセス情報をjsonで返す。
function info(req, res) {
    logger.debug(req.headers, req.params);
    res.json({
        versions: process.versions,
        memory: process.memoryUsage()
    });
}
