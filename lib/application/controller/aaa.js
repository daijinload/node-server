
var AaaController = exports;

// TODO express固有のセットアップ処理だが、ファイルを分けたほうが良いのか？
AaaController._routes = function(app) {
    app.get('/', AaaController.get);
    app.get('/aaa', AaaController.get);
    return app;
};

AaaController.get = function(req, res) {
    res.status(200).send('hello aaa!!').end();
};
