/**
 * @fileoverview URLルーティング
 */

/*
 * Module dependencies
 */

// main
module.exports = function(app) {
    app.delete('/aaa/:entryId?', orionReceive);
    return app;
};

// orionからのデータ送信処理
function orionReceive(req, res) {
    res.status(200).end();
}
