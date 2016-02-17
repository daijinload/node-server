
var indexController = exports;

// TODO express固有のセットアップ処理だが、ファイルを分けたほうが良いのか？
indexController._routes = function(app) {
    app.get('/', function(req, res) {
        res.status(200).send('hello index!!').end();
    });
    return app;
};
